package com.codesquad.issueTracker.issue.application.dto;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import com.codesquad.issueTracker.issue.domain.Image;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;

import lombok.Getter;

@Getter
public class IssueDetailResponse {

    private Long issueId;
    private String title;
    private String content;
    private boolean isOpen;
    private LocalDateTime writtenTime;

    private UserOutlineResponse writerOutline;
    private List<UserOutlineResponse> assignees;
    private List<LabelOutline> labels;

    private MilestoneInformation milestoneInformation;
    private List<CommentOutline> commentOutlines;
    private List<String> imageUrls;

    public IssueDetailResponse(Issue issue) {
        this.issueId = issue.getId();
        this.title = issue.getTitle();
        this.content = issue.getContent();
        this.isOpen = issue.isOpened();
        this.writtenTime = issue.getWrittenTime();
        this.writerOutline = new UserOutlineResponse(issue.getWriter(), issue.getWriterImage());
        this.assignees = resolveAssignees(issue);
        this.labels = resolveLabels(issue);
        if (issue.getMilestone() != null) {
            this.milestoneInformation = new MilestoneInformation(issue.getMilestone());
        }
        this.commentOutlines = issue.getComments()
            .stream().map(CommentOutline::new)
            .sorted(Comparator.comparing(CommentOutline::getWrittenTime))
            .collect(Collectors.toList());
        this.imageUrls = issue.getImages()
            .stream().map(Image::getImageUrl)
            .collect(Collectors.toList());
    }

    private List<UserOutlineResponse> resolveAssignees(Issue issue) {
        return issue.getAssignedIssues()
            .stream()
            .map(assignedIssue -> new UserOutlineResponse(assignedIssue.getUserName(), assignedIssue.getUserImage()))
            .collect(Collectors.toList());
    }

    private List<LabelOutline> resolveLabels(Issue issue) {
        return issue.getAttachedLabels()
            .stream()
            .map(attachedLabel -> {
                try {
                    return new LabelOutline(attachedLabel.getLabelName(), attachedLabel.getLabelColor(),
                        attachedLabel.getTextColor());
                } catch (EntityNotFoundException e) {
                    return null;
                }
            })
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    }
}
