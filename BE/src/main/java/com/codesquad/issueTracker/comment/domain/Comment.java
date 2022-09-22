package com.codesquad.issueTracker.comment.domain;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.user.domain.User;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@lombok.Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDateTime writtenTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issueId")
    private Issue issue;

    @Enumerated(value = EnumType.STRING)
    private CommentStatus commentStatus;

    public Comment(String content, LocalDateTime writtenTime, User user,
        Issue issue, CommentStatus status) {
        this.content = content;
        this.writtenTime = writtenTime;
        this.user = user;
        this.issue = issue;
        this.issue.addComment(this);
        this.commentStatus = status;
    }

    public Comment(Long id, String content, LocalDateTime writtenTime, User user,
        Issue issue, CommentStatus status) {
        this.id = id;
        this.content = content;
        this.writtenTime = writtenTime;
        this.user = user;
        this.issue = issue;
        this.issue.addComment(this);
        this.commentStatus = status;
    }

    public String getWriterName() {
        return user.getName();
    }

    public String getWriterImage() {
        return user.getImage();
    }

    public boolean isNotWrittenBy(Long userId) {
        return !Objects.equals(this.user.getId(), userId);
    }

    public void editContent(String content) {
        this.content = content;
    }

    public void removeRelationWithIssue() {
        issue.deleteComment(this);
    }

    public boolean isEditable(long userId) {
        return this.user.getId() == userId;
    }
}
