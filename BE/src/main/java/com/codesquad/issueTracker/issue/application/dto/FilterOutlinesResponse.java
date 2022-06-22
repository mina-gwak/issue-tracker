package com.codesquad.issueTracker.issue.application.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class FilterOutlinesResponse {
    private List<FilterOutlineResponse> filterOutlineResponses;

    public FilterOutlinesResponse(
        List<FilterOutlineResponse> filterOutlineResponses) {
        this.filterOutlineResponses = filterOutlineResponses;
    }
}
