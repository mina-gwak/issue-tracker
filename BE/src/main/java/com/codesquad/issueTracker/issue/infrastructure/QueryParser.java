package com.codesquad.issueTracker.issue.infrastructure;

import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.util.EnumUtils;

import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.SubFilterDetail;
import com.codesquad.issueTracker.issue.domain.MainFilter;
import com.codesquad.issueTracker.issue.domain.SubFilter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class QueryParser {

    public FilterCondition makeFilterCondition(String query) {
        String[] result = query.split(" ");

        FilterCondition filterConditionRequest = new FilterCondition();
        for (String s : result) {
            String[] tmp = s.split(":");

            String queryHeader = tmp[0];
            String queryFooter = tmp[1];

            // main filter parser
            if (queryHeader.equals("is")) {
                MainFilter mainFilter;
                try {
                    mainFilter = EnumUtils.findEnumInsensitiveCase(MainFilter.class, tmp[1]);
                    filterConditionRequest.changeMainFilter(mainFilter);
                } catch (IllegalArgumentException e) {
                    log.info("유효하지 않는 mainFilter 타입입니다.");
                    throw new IllegalStateException("유효하지 않는 mainFilter 타입입니다.");
                }
                continue;
            }

            // sub filter parser
            SubFilter subFilter;
            try {
                subFilter = EnumUtils.findEnumInsensitiveCase(SubFilter.class, queryHeader);
                filterConditionRequest.addSubFilter(new SubFilterDetail(subFilter, queryFooter));
            } catch (IllegalArgumentException e) {
                log.info("유효하지 않는 subFilter type입니다.");
                throw new IllegalStateException("유효하지 않는 subFilter type입니다.");
            }
        }
        return filterConditionRequest;
    }
}
