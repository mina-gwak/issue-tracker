package com.codesquad.issueTracker.issue.application.dto;

import com.codesquad.issueTracker.milestone.domain.Milestone;

import lombok.Getter;

@Getter
public class MilestoneInformation {
    private String milestoneName;
    private long allIssueCount;
    private long closedIssueCount;

    public MilestoneInformation(Milestone milestone) {
        this.milestoneName = milestone.getName();
        this.allIssueCount = milestone.getAllIssueCount();
        this.closedIssueCount = milestone.getClosedIssueCount();
    }
}
