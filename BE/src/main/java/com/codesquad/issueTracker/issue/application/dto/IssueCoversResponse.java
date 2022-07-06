package com.codesquad.issueTracker.issue.application.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class IssueCoversResponse {

    private List<IssueCoverResponse> issueCoverResponses;
    private int openIssueCount;
    private int closeIssueCount;
    private long labelCount;
    private long milestoneCount;

    public IssueCoversResponse(
        List<IssueCoverResponse> issueCoverResponses, int openIssueCount, int closeIssueCount, long labelCount,
        long milestoneCount) {
        this.issueCoverResponses = issueCoverResponses;
        this.openIssueCount = openIssueCount;
        this.closeIssueCount = closeIssueCount;
        this.labelCount = labelCount;
        this.milestoneCount = milestoneCount;
    }
}
