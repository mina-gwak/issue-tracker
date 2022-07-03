package com.codesquad.issueTracker.milestone.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.codesquad.issueTracker.issue.domain.Issue;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Milestone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDateTime dueDate;
    private String description;

    @OneToMany(mappedBy = "milestone")
    private List<Issue> issues = new ArrayList<>();

    public Milestone(String name, LocalDateTime dueDate, String description) {
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
    }

    public long getAllIssueCount() {
        return issues.size();
    }

    public long getClosedIssueCount() {
        return issues.stream()
            .filter(issue -> !issue.isOpened())
            .count();
    }
}
