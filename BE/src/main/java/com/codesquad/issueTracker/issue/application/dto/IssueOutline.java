package com.codesquad.issueTracker.issue.application.dto;

import java.time.LocalDateTime;

import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;

import lombok.Getter;

@Getter
public class IssueOutline {
    private UserOutlineResponse writerOutline;
    private String content;
    private LocalDateTime writtenTime;

    public IssueOutline(UserOutlineResponse writerOutline, String content, LocalDateTime writtenTime) {
        this.writerOutline = writerOutline;
        this.content = content;
        this.writtenTime = writtenTime;
    }
}
