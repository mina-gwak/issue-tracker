package com.codesquad.issueTracker.issue.application.dto;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.label.domain.AttachedLabel;
import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class IssueCoverResponse {

    private List<LabelCoverResponse> labelCoverResponses;
    private List<UserOutlineResponse> assignees;
    private String title;
    private Long issueId;
    private String writer;
    private String writerImage;
    private LocalDateTime modificationTime;
    private String milestoneName;
    private boolean opened;

    public IssueCoverResponse(Issue issue) {
        Set<AttachedLabel> attachedLabels = issue.getAttachedLabels();

        // TODO : sorting 필요..
        this.labelCoverResponses = attachedLabels.stream()
            .map(AttachedLabel::getLabel)
            .map(label -> new LabelCoverResponse(label.getName(), label.getLabelColor(), label.getTextColor()))
            .collect(Collectors.toList());

        this.assignees = issue.getAssignedIssues()
            .stream().map(assignedIssue -> new UserOutlineResponse(assignedIssue.getUserName(), assignedIssue.getUserImage()))
            .collect(Collectors.toList());

        this.title = issue.getTitle();
        this.issueId = issue.getId();
        this.writer = issue.getUser().getName();
        this.writerImage = issue.getUser().getImage();
        this.modificationTime = issue.getModificationTime();
        this.milestoneName = issue.getMilestone().getName();
        this.opened = issue.isOpened();
    }
}
