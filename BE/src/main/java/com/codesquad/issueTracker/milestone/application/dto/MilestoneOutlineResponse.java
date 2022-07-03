package com.codesquad.issueTracker.milestone.application.dto;

import lombok.Getter;

@Getter
public class MilestoneOutlineResponse {
    private String milestoneName;

    public MilestoneOutlineResponse(String milestoneName) {
        this.milestoneName = milestoneName;
    }
}
