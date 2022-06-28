package com.codesquad.issueTracker.issue.application.dto;

import com.codesquad.issueTracker.issue.domain.SubFilter;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class SubFilterDetail {

    private SubFilter subFilter;
    private String value;

    public SubFilterDetail(SubFilter subFilter, String value) {
        this.subFilter = subFilter;
        this.value = value;
    }

    public String getFilterName() {
        return subFilter.name();
    }

}
