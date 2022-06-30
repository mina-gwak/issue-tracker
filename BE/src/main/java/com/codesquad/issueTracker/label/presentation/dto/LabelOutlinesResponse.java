package com.codesquad.issueTracker.label.presentation.dto;

import java.util.List;

import com.codesquad.issueTracker.label.application.dto.LabelOutlineResponse;

import lombok.Getter;

@Getter
public class LabelOutlinesResponse {
    private List<LabelOutlineResponse> labelOutlineResponses;

    public LabelOutlinesResponse(
        List<LabelOutlineResponse> labelOutlineResponses) {
        this.labelOutlineResponses = labelOutlineResponses;
    }
}
