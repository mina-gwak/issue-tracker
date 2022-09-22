package com.codesquad.issueTracker.issue.domain.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.IssueCoverResponse;
import com.codesquad.issueTracker.issue.domain.MainFilter;

public interface IssueRepositoryCustom {
    Page<IssueCoverResponse> search(FilterCondition condition, Long userId, Pageable pageable);

    Long findCountByMainStatus(FilterCondition condition, MainFilter mainFilter);
}
