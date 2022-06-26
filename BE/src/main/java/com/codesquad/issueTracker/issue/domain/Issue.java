package com.codesquad.issueTracker.issue.domain;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.codesquad.issueTracker.comment.domain.Comment;
import com.codesquad.issueTracker.label.domain.AttachedLabel;
import com.codesquad.issueTracker.milestone.domain.Milestone;
import com.codesquad.issueTracker.user.domain.User;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private boolean isOpened;
    private LocalDateTime writtenTime;
    private LocalDateTime modificationTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "issue")
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "issue")
    private Set<AttachedLabel> attachedLabels = new HashSet<>();

    @OneToMany(mappedBy = "issue")
    private Set<AssignedIssue> assignedIssues = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "milestoneId")
    private Milestone milestone;

    public Issue(String title, String content, LocalDateTime writtenTime,
        LocalDateTime modificationTime) {
        this.title = title;
        this.content = content;
        this.isOpened = true;
        this.writtenTime = writtenTime;
        this.modificationTime = modificationTime;
    }
}
