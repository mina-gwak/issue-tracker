package com.codesquad.issueTracker.issue.application.dto;

import java.time.LocalDateTime;

import com.codesquad.issueTracker.comment.domain.Comment;

import lombok.Getter;

@Getter
public class CommentOutline {
    private UserOutline commentUserOutline;
    private String content;
    private LocalDateTime writtenTime;

    public CommentOutline(Comment comment) {
        this.commentUserOutline = new UserOutline(comment.getWriterName(), comment.getWriterImage());
        this.content = comment.getContent();
        this.writtenTime = comment.getWrittenTime();
    }
}
