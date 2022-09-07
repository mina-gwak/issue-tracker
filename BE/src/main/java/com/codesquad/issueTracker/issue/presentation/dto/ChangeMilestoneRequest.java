package com.codesquad.issueTracker.issue.presentation.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChangeMilestoneRequest {
    private String milestone;

    public ChangeMilestoneRequest(String milestone) {
        this.milestone = milestone;
    }
}
