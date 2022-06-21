package com.codesquad.issueTracker.issue.domain.repository;

import java.util.List;

import com.codesquad.issueTracker.issue.application.dto.IssueCoverResponse;
import com.codesquad.issueTracker.issue.presentation.dto.FilterCondition;

public interface IssueRepositoryCustom {
    List<IssueCoverResponse> search(FilterCondition condition, Long userId);
}
