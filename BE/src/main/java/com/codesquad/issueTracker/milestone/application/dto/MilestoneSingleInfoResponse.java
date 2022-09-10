package com.codesquad.issueTracker.milestone.application.dto;

import java.time.LocalDateTime;

import com.codesquad.issueTracker.milestone.domain.Milestone;

import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class MilestoneSingleInfoResponse {

    @EqualsAndHashCode.Include
    private Long id;

    @EqualsAndHashCode.Include
    private String name;
    private LocalDateTime dueDate;
    private String description;

    private Long openIssueCount;
    private Long closeIssueCount;
    private String ratio;

    public MilestoneSingleInfoResponse(Milestone milestone) {
        this.id = milestone.getId();
        this.name = milestone.getName();
        this.dueDate = milestone.getDueDate();
        this.description = milestone.getDescription();
        this.openIssueCount = milestone.getOpenedIssueCount();
        this.closeIssueCount = milestone.getClosedIssueCount();
        this.ratio = String.format(
            "%.2f", (double)milestone.getClosedIssueCount() / (double)milestone.getAllIssueCount() * 100.0);
    }
}
