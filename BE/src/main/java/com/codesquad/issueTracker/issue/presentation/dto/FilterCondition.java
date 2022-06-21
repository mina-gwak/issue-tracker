package com.codesquad.issueTracker.issue.presentation.dto;

import java.util.ArrayList;
import java.util.List;

import com.codesquad.issueTracker.issue.domain.MainFilter;

import lombok.Getter;

@Getter
public class FilterCondition {

    private MainFilter mainFilter = MainFilter.OPEN; // default main filter is open
    private List<SubFilterDetail> subFilters = new ArrayList<>();

    public void changeMainFilter(MainFilter mainFilter) {
        this.mainFilter = mainFilter;
    }

    public void addSubFilter(SubFilterDetail subFilterDetail) {
        subFilters.add(subFilterDetail);
    }
}
