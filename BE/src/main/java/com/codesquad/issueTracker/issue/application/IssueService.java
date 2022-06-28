package com.codesquad.issueTracker.issue.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.IssueCoverResponse;
import com.codesquad.issueTracker.issue.domain.repository.IssueRepository;
import com.codesquad.issueTracker.issue.infrastructure.QueryParser;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class IssueService {

    private final QueryParser queryParser;
    private final IssueRepository issueRepository;

    @Transactional(readOnly = true)
    public List<IssueCoverResponse> findIssuesByCondition(String query, Long userId) {
        FilterCondition condition = queryParser.makeFilterCondition(query);
        return issueRepository.search(condition, userId);
    }
}