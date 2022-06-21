package com.codesquad.issueTracker.issue.presentation.dto;

import com.codesquad.issueTracker.issue.domain.SubFilter;

import lombok.ToString;

@ToString
public class SubFilterDetail {

    private SubFilter subFilter;
    private String value;

    public SubFilterDetail(SubFilter subFilter, String value) {
        this.subFilter = subFilter;
        this.value = value;
    }
}
