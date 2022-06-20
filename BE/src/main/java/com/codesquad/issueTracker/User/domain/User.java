package com.codesquad.issueTracker.User.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.codesquad.issueTracker.Issue.domain.AssignedIssue;
import com.codesquad.issueTracker.Issue.domain.Issue;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String image;

    @OneToMany(mappedBy = "user")
    private List<AssignedIssue> assignedIssues = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Issue> issues = new ArrayList<>();

    public User(String name, String image) {
        this.name = name;
        this.image = image;
    }
}
