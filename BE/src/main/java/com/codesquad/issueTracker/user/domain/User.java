package com.codesquad.issueTracker.user.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.codesquad.issueTracker.issue.domain.AssignedIssue;
import com.codesquad.issueTracker.issue.domain.Issue;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String nickname;
    private String image;

    @OneToMany(mappedBy = "user")
    private List<AssignedIssue> assignedIssues = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Issue> issues = new ArrayList<>();

    public User(Long id, String name, String nickname, String image) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.image = image;
    }

    public User(String name, String nickname, String image) {
        this.name = name;
        this.nickname = nickname;
        this.image = image;
    }

    public boolean isYourId(Long userId) {
        return this.id.equals(userId);
    }
}
