package com.codesquad.issueTracker.issue.infrastructure;

import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.util.EnumUtils;

import com.codesquad.issueTracker.exception.issue.InvalidFilterException;
import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.SubFilterDetail;
import com.codesquad.issueTracker.issue.domain.MainFilter;
import com.codesquad.issueTracker.issue.domain.SubFilter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class QueryParser {

    public FilterCondition makeFilterCondition(String filterQuery) {
        String[] filters = filterQuery.split(" ");
        return extractFilter(filters);
    }

    private FilterCondition extractFilter(String[] filters) {
        FilterCondition filterConditionRequest = new FilterCondition();

        for (String filter : filters) {
            String[] tmp = filter.split(":");

            String queryHeader = tmp[0];
            String queryFooter = tmp[1];

            if (queryHeader.equals("is")) {
                changeMainFilter(filterConditionRequest, tmp);
                continue;
            }
            addSubFilter(filterConditionRequest, queryHeader, queryFooter);
        }
        return filterConditionRequest;
    }

    private void changeMainFilter(FilterCondition filterConditionRequest, String[] tmp) {
        MainFilter mainFilter;
        try {
            mainFilter = EnumUtils.findEnumInsensitiveCase(MainFilter.class, tmp[1]);
            filterConditionRequest.changeMainFilter(mainFilter);
        } catch (IllegalArgumentException e) {
            log.debug("유효하지 않는 mainFilter 타입입니다.");
            throw new InvalidFilterException();
        }
    }

    private void addSubFilter(FilterCondition filterConditionRequest, String queryHeader, String queryFooter) {
        SubFilter subFilter;
        try {
            subFilter = EnumUtils.findEnumInsensitiveCase(SubFilter.class, queryHeader);
            filterConditionRequest.addSubFilter(new SubFilterDetail(subFilter, queryFooter));
        } catch (IllegalArgumentException e) {
            log.debug("유효하지 않는 subFilter type입니다.");
            throw new InvalidFilterException();
        }
    }
}
