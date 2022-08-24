package com.codesquad.issueTracker.issue.domain.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.issue.domain.MainFilter;

public interface IssueRepositoryCustom {
    List<Issue> search(FilterCondition condition, Long userId, Pageable pageable);

    Long findCountByMainStatus(FilterCondition condition, MainFilter mainFilter);
}
