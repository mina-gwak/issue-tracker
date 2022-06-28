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

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class IssueService {

    private final QueryParser queryParser;
    private final IssueRepository issueRepository;

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
}
