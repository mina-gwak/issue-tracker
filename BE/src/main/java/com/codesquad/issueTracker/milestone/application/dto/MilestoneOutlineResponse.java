package com.codesquad.issueTracker.milestone.application.dto;

import lombok.Getter;

@Getter
public class MilestoneOutlineResponse {
    private String optionName;

    public MilestoneOutlineResponse(String optionName) {
        this.optionName = optionName;
    }
}
