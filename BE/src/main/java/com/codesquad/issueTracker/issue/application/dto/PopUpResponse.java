package com.codesquad.issueTracker.issue.application.dto;

import java.time.LocalDateTime;

import com.codesquad.issueTracker.issue.domain.Issue;

import lombok.Getter;

@Getter
public class PopUpResponse {

    private String title;
    private String content;
    private LocalDateTime writtenTime;
    private boolean isAssignedMe;

    public PopUpResponse(Issue issue, boolean assigned) {
        this.title = issue.getTitle();
        this.writtenTime = issue.getWrittenTime();
        this.isAssignedMe = assigned;
        this.content = issue.getContent();
        if (this.content.length() > 50) {
            this.content = this.content.substring(0, 50) + "...";
        }
    }
}
