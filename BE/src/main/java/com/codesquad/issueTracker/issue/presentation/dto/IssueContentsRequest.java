package com.codesquad.issueTracker.issue.presentation.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.milestone.domain.Milestone;
import com.codesquad.issueTracker.user.domain.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class IssueContentsRequest {
    private String title;
    private String content;
    private List<String> assignees = new ArrayList<>();
    private List<String> labels = new ArrayList<>();
    private String milestone;

    public Issue toEntity(User user, Milestone milestone) {
        return new Issue(title, content, LocalDateTime.now(), LocalDateTime.now(), user, milestone);
    }
}
