package com.codesquad.issueTracker.comment.domain;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.user.domain.User;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
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

    private boolean editable;

    public Comment(String content, LocalDateTime writtenTime, User user,
        Issue issue) {
        this.content = content;
        this.writtenTime = writtenTime;
        this.user = user;
        this.issue = issue;
    }

    public String getWriterName() {
        return user.getName();
    }

    public String getWriterImage() {
        return user.getImage();
    }
}
