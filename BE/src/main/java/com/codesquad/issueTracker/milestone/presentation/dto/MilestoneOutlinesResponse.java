package com.codesquad.issueTracker.milestone.presentation.dto;

import java.util.List;

import com.codesquad.issueTracker.milestone.application.dto.MilestoneOutlineResponse;

import lombok.Getter;

@Getter
public class MilestoneOutlinesResponse {
    private List<MilestoneOutlineResponse> milestoneOutlineResponses;

    public MilestoneOutlinesResponse(
        List<MilestoneOutlineResponse> milestoneOutlineResponses) {
        this.milestoneOutlineResponses = milestoneOutlineResponses;
    }
}
