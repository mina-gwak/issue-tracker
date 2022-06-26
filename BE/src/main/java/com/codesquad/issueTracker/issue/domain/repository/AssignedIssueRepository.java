package com.codesquad.issueTracker.issue.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codesquad.issueTracker.issue.domain.AssignedIssue;

public interface AssignedIssueRepository extends JpaRepository<AssignedIssue, Long> {
}
