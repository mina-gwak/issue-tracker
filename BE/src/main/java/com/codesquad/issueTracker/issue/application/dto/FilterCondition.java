package com.codesquad.issueTracker.issue.application.dto;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.codesquad.issueTracker.issue.domain.MainFilter;

import lombok.Getter;

@Getter
public class FilterCondition {

    private MainFilter mainFilter = MainFilter.OPEN; // default main filter is open
    private MultiValueMap<String, SubFilterDetail> subFilters = new LinkedMultiValueMap<>();

    public void changeMainFilter(MainFilter mainFilter) {
        this.mainFilter = mainFilter;
    }

    public void addSubFilter(SubFilterDetail subFilterDetail) {
        subFilters.add(subFilterDetail.getFilterName(), subFilterDetail);
    }
}
