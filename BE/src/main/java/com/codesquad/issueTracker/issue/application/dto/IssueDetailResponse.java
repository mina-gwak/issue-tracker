package com.codesquad.issueTracker.issue.application.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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
        this.assignees = issue.getAssignedIssues()
            .stream().map(assignedIssue -> new UserOutlineResponse(assignedIssue.getUserName(), assignedIssue.getUserImage()))
            .collect(Collectors.toList());
        this.labels = issue.getAttachedLabels()
            .stream()
            .map(attachedLabel -> new LabelOutline(attachedLabel.getLabelName(), attachedLabel.getLabelColor(),
                attachedLabel.getTextColor()))
            .collect(Collectors.toList());
        if(issue.getMilestone() != null) {
            this.milestoneInformation = new MilestoneInformation(issue.getMilestone());
        }
        this.commentOutlines = issue.getComments()
            .stream().map(CommentOutline::new)
            .collect(Collectors.toList());
        this.imageUrls = issue.getImages()
            .stream().map(Image::getImageUrl)
            .collect(Collectors.toList());
    }
}
