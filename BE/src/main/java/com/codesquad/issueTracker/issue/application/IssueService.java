package com.codesquad.issueTracker.issue.application;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.IssueCoverResponse;
import com.codesquad.issueTracker.issue.application.dto.IssueCoversResponse;
import com.codesquad.issueTracker.issue.application.dto.PopUpResponse;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.issue.domain.MainFilter;
import com.codesquad.issueTracker.issue.domain.repository.IssueRepository;
import com.codesquad.issueTracker.issue.infrastructure.QueryParser;
import com.codesquad.issueTracker.issue.presentation.dto.IssueContentsRequest;
import com.codesquad.issueTracker.label.domain.Label;
import com.codesquad.issueTracker.label.domain.LabelRepository;
import com.codesquad.issueTracker.milestone.domain.Milestone;
import com.codesquad.issueTracker.milestone.domain.MilestoneRepository;
import com.codesquad.issueTracker.user.domain.User;
import com.codesquad.issueTracker.user.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class IssueService {

    private final QueryParser queryParser;
    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final LabelRepository labelRepository;
    private final MilestoneRepository milestoneRepository;

    @Transactional(readOnly = true)
    public IssueCoversResponse findIssuesByCondition(String query, Long userId) {
        FilterCondition condition = queryParser.makeFilterCondition(query);
        List<Issue> issues = issueRepository.search(condition, userId);

        Predicate<Issue> isOpened;
        boolean closeCheck = false;
        if (condition.getMainFilter().equals(MainFilter.CLOSE)) {
            isOpened = closedPredicate();
            closeCheck = true;
        } else {
            isOpened = closedPredicate().negate();
        }

        List<IssueCoverResponse> result = issues.stream()
            .filter(isOpened)
            .map(IssueCoverResponse::new)
            .collect(Collectors.toList());

        int openCount, closeCount;
        if (closeCheck) {
            closeCount = result.size();
            openCount = issues.size() - closeCount;
        } else {
            openCount = result.size();
            closeCount = issues.size() - openCount;
        }
        return new IssueCoversResponse(result, openCount, closeCount);
    }

    private Predicate<Issue> closedPredicate() {
        return issue -> !issue.isOpened();
    }

    @Transactional(readOnly = true)
    public PopUpResponse popUpIssue(Long issueId, Long userId) {
        Issue issue = issueRepository.findById(issueId)
            .orElseThrow(() -> new IllegalStateException("유효하지 않은 issueId입니다."));

        return new PopUpResponse(issue, issue.isAssignedThisUser(userId));
    }

    @Transactional
    public void changeIssuesStatus(List<Long> issueIds, String status) {
        issueRepository.changeIssuesStatus(issueIds, status);
    }

    @Transactional
    public void makeIssue(IssueContentsRequest issueContentsRequest, Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalStateException("없는 유저입니다."));

        Milestone milestone = milestoneRepository.findByName(issueContentsRequest.getMilestone())
            .orElseThrow(() -> new IllegalStateException("없는 마일스톤 입니다."));

        Issue issue = issueContentsRequest.toEntity(user, milestone);

        List<User> users = userRepository.findByNameIn(issueContentsRequest.getAssignees());
        issue.assignUser(users);

        List<Label> labels = labelRepository.findByNameIn(issueContentsRequest.getLabels());
        issue.attachedLabel(labels);

        issue.addFiles(issueContentsRequest.getFileUrl());

        issueRepository.save(issue);
    }
}
