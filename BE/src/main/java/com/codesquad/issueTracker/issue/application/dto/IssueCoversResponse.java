package com.codesquad.issueTracker.issue.application.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class IssueCoversResponse {

    private List<IssueCoverResponse> issueCoverResponses;
    private int openIssueCount;
    private int closeIssueCount;

    public IssueCoversResponse(
        List<IssueCoverResponse> issueCoverResponses, int openIssueCount, int closeIssueCount) {
        this.issueCoverResponses = issueCoverResponses;
        this.openIssueCount = openIssueCount;
        this.closeIssueCount = closeIssueCount;
    }
}
