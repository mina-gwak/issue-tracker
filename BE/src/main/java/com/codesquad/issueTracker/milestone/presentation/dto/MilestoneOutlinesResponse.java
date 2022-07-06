package com.codesquad.issueTracker.milestone.presentation.dto;

import java.util.List;

import com.codesquad.issueTracker.milestone.application.dto.MilestoneOutlineResponse;

import lombok.Getter;

@Getter
public class MilestoneOutlinesResponse {
    private List<MilestoneOutlineResponse> milestonesOutlineResponses;

    public MilestoneOutlinesResponse(
        List<MilestoneOutlineResponse> milestonesOutlineResponses) {
        this.milestonesOutlineResponses = milestonesOutlineResponses;
    }
}
