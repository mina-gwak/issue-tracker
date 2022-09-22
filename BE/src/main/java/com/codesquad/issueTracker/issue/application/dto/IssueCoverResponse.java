package com.codesquad.issueTracker.issue.application.dto;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class IssueCoverResponse {

    private List<LabelCoverResponse> labelCoverResponses;
    private List<UserOutlineResponse> assignees;
    private String title;
    private Long issueId;
    private String writer;
    private String writerImage;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime modificationTime;
    private String milestoneName;
    private boolean opened;

    public IssueCoverResponse(Issue issue) {
        this.labelCoverResponses = issue.getAttachedLabels().stream()
            .map(attachedLabel -> {
                try {
                    return new LabelCoverResponse(
                        attachedLabel.getLabelName(),
                        attachedLabel.getLabelColor(),
                        attachedLabel.getTextColor());
                } catch (EntityNotFoundException e) {
                    return null;
                }
            })
            .filter(Objects::nonNull)
            .sorted(Comparator.comparing(LabelCoverResponse::getLabelName))
            .collect(Collectors.toList());

        this.assignees = issue.getAssignedIssues()
            .stream()
            .map(assignedIssue -> new UserOutlineResponse(assignedIssue.getUserName(), assignedIssue.getUserImage()))
            .sorted(Comparator.comparing(UserOutlineResponse::getOptionName))
            .collect(Collectors.toList());

        this.title = issue.getTitle();
        this.issueId = issue.getId();
        this.writer = issue.getUsername();
        this.writerImage = issue.getUserImage();
        this.modificationTime = issue.getModificationTime();
        this.milestoneName = issue.getMilestoneName();
        this.opened = issue.isOpened();
    }

    public IssueCoverResponse(List<LabelCoverResponse> labelCoverResponses, List<UserOutlineResponse> assignees,
        String title, Long issueId, String writer, String writerImage, LocalDateTime modificationTime,
        String milestoneName,
        boolean opened) {
        this.labelCoverResponses = labelCoverResponses.stream()
            .sorted(Comparator.comparing(LabelCoverResponse::getLabelName))
            .collect(Collectors.toList());
        this.assignees = assignees.stream()
            .sorted(Comparator.comparing(UserOutlineResponse::getOptionName))
            .collect(Collectors.toList());
        this.title = title;
        this.issueId = issueId;
        this.writer = writer;
        this.writerImage = writerImage;
        this.modificationTime = modificationTime;
        this.milestoneName = milestoneName;
        this.opened = opened;
    }
}
