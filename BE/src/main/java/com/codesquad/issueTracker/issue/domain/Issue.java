package com.codesquad.issueTracker.issue.domain;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
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
import com.codesquad.issueTracker.label.domain.Label;
import com.codesquad.issueTracker.milestone.domain.Milestone;
import com.codesquad.issueTracker.user.domain.User;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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

    @OneToMany(mappedBy = "issue", cascade = CascadeType.PERSIST)
    private Set<AttachedLabel> attachedLabels = new HashSet<>();

    @OneToMany(mappedBy = "issue", cascade = CascadeType.PERSIST)
    private Set<AssignedIssue> assignedIssues = new HashSet<>();

    @OneToMany(mappedBy = "issue", cascade = CascadeType.PERSIST)
    private Set<Image> images = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "milestoneId")
    private Milestone milestone;

    public Issue(String title, String content, LocalDateTime writtenTime,
        LocalDateTime modificationTime, User user, Milestone milestone) {
        this.title = title;
        this.content = content;
        this.isOpened = true;
        this.writtenTime = writtenTime;
        this.modificationTime = modificationTime;
        this.user = user;
        this.milestone = milestone;
    }

    public Issue(Long id, String title, String content, LocalDateTime writtenTime,
        LocalDateTime modificationTime, User user, Milestone milestone) {
        this(title, content, writtenTime, modificationTime, user, milestone);
        this.id = id;
    }

    public boolean isAssignedThisUser(Long userId) {
        for (AssignedIssue assignedIssue : assignedIssues) {
            if (assignedIssue.isAssignedThisUser(userId)) {
                return true;
            }
        }
        return false;
    }

    public void assignUser(List<User> users) {
        for (User user : users) {
            assignedIssues.add(new AssignedIssue(user, this));
        }
    }

    public void attachedLabel(List<Label> labels) {
        for (Label label : labels) {
            attachedLabels.add(new AttachedLabel(label, this));
        }
    }

    public void addFiles(List<String> fileUrl) {
        for (String url : fileUrl) {
            images.add(new Image(url, this));
        }
    }

    public String getWriter() {
        return user.getName();
    }

    public String getWriterImage() {
        return user.getImage();
    }

    public void addComment(Comment comment) {
        comments.add(comment);
    }
}
