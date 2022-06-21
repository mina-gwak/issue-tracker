package com.codesquad.issueTracker.issue.application;

import java.util.List;

import org.springframework.stereotype.Service;

import com.codesquad.issueTracker.issue.application.dto.IssueCoverResponse;
import com.codesquad.issueTracker.issue.domain.repository.IssueRepository;
import com.codesquad.issueTracker.issue.infrastructure.QueryParser;
import com.codesquad.issueTracker.issue.presentation.dto.FilterCondition;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class IssueService {

    private final QueryParser queryParser;
    private final IssueRepository issueRepository;

    public List<IssueCoverResponse> findIssuesByCondition(String query, Long userId) {
        FilterCondition condition = queryParser.makeFilterCondition(query);
        return issueRepository.search(condition, userId);
    }
}
