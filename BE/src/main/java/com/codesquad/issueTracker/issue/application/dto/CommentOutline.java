package com.codesquad.issueTracker.issue.application.dto;

import java.time.LocalDateTime;

import com.codesquad.issueTracker.comment.domain.Comment;
import com.codesquad.issueTracker.comment.domain.CommentStatus;
import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;

import lombok.Getter;

@Getter
public class CommentOutline {
    private UserOutlineResponse commentUserOutline;

    private long commentId;
    private String content;
    private LocalDateTime writtenTime;
    private CommentStatus status;

    public CommentOutline(Comment comment) {
        this.commentUserOutline = new UserOutlineResponse(comment.getWriterName(), comment.getWriterImage());
        this.commentId = comment.getId();
        this.content = comment.getContent();
        this.writtenTime = comment.getWrittenTime();
        this.status = comment.getCommentStatus();
    }
}
