package com.codesquad.issueTracker.label.presentation.dto;

import java.util.List;

import com.codesquad.issueTracker.label.application.dto.LabelOutlineResponse;

import lombok.Getter;

@Getter
public class LabelOutlinesResponse {
    private List<LabelOutlineResponse> labelsOutlineResponses;

    public LabelOutlinesResponse(
        List<LabelOutlineResponse> labelsOutlineResponses) {
        this.labelsOutlineResponses = labelsOutlineResponses;
    }
}
