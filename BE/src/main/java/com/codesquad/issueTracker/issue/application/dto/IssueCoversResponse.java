package com.codesquad.issueTracker.issue.application.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class IssueCoversResponse {

    private List<IssueCoverResponse> issueCoverResponses;
    private long openIssueCount;
    private long closeIssueCount;
    private long labelCount;
    private long milestoneCount;
    private int totalPages;
    private long totalElements;

    public IssueCoversResponse(
        List<IssueCoverResponse> issueCoverResponses, long openIssueCount, long closeIssueCount, long labelCount,
        long milestoneCount, int totalPages, long totalElements) {
        this.issueCoverResponses = issueCoverResponses;
        this.openIssueCount = openIssueCount;
        this.closeIssueCount = closeIssueCount;
        this.labelCount = labelCount;
        this.milestoneCount = milestoneCount;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
    }
}
