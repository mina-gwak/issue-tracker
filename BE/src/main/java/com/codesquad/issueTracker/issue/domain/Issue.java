package com.codesquad.issueTracker.issue.domain;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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

    @OneToMany(mappedBy = "issue", orphanRemoval = true)
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "issue", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private Set<AttachedLabel> attachedLabels = new HashSet<>();

    @OneToMany(mappedBy = "issue", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private Set<AssignedIssue> assignedIssues = new HashSet<>();

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

    public String getWriter() {
        return user.getName();
    }

    public String getWriterImage() {
        return user.getImage();
    }

    public void addComment(Comment comment) {
        this.modificationTime = LocalDateTime.now();
        comments.add(comment);
    }

    public boolean isNotWrittenBy(Long userId) {
        return !Objects.equals(this.user.getId(), userId);
    }

    public void changeStatus(Boolean valueOf) {
        this.modificationTime = LocalDateTime.now();
        this.isOpened = valueOf;
    }

    public void updateTitle(String title) {
        this.modificationTime = LocalDateTime.now();
        this.title = title;
    }

    public void updateAssignee(List<User> assignees) {
        this.modificationTime = LocalDateTime.now();
        removeAssigneesFromAssignedIssues(assignees);
        removeDuplicatedAssignee(assignees);
        assignUser(assignees);
    }

    public void updateLabels(List<Label> labels) {
        this.modificationTime = LocalDateTime.now();
        removeLabelsFromAttachedLabels(labels);
        removeDuplicatedLabel(labels);
        attachedLabel(labels);
    }

    public String getUsername() {
        return user.getName();
    }

    public String getUserImage() {
        return user.getImage();
    }

    public String getMilestoneName() {
        if (milestone != null) {
            return milestone.getName();
        }
        return null;
    }

    public void deleteComment(Comment comment) {
        this.modificationTime = LocalDateTime.now();
        comments.remove(comment);
    }

    public void removeMilestone() {
        this.modificationTime = LocalDateTime.now();
        this.milestone = null;
    }

    public boolean isOpened() {
        return this.isOpened;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Issue issue = (Issue)o;
        return Objects.equals(getId(), issue.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    public boolean isEditable(Long userId) {
        return this.user.isYourId(userId);
    }

    public void updateContents(String content) {
        this.content = content;
    }

    public void changeMilestone(Milestone milestone) {
        this.milestone = milestone;
    }

    private void removeAssigneesFromAssignedIssues(List<User> assignees) {
        List<AssignedIssue> removed = assignedIssues.stream()
            .filter(assignedIssue ->
                !assignees.contains(assignedIssue.getUser()))
            .collect(Collectors.toList());
        removed.forEach(assignedIssues::remove);
    }

    private void removeDuplicatedAssignee(List<User> assignees) {
        List<User> keepAssigned = assignedIssues.stream()
            .map(AssignedIssue::getUser)
            .filter(assignees::contains)
            .collect(Collectors.toList());
        assignees.removeAll(keepAssigned);
    }

    private void removeLabelsFromAttachedLabels(List<Label> labels) {
        List<AttachedLabel> removed = attachedLabels.stream()
            .filter(attachedLabel ->
                !labels.contains(attachedLabel.getLabel()))
            .collect(Collectors.toList());
        removed.forEach(attachedLabels::remove);
    }

    private void removeDuplicatedLabel(List<Label> labels) {
        List<Label> keepAttachedLabels = attachedLabels.stream()
            .map(AttachedLabel::getLabel)
            .filter(labels::contains)
            .collect(Collectors.toList());
        labels.removeAll(keepAttachedLabels);
    }
}
