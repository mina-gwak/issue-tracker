package com.codesquad.issueTracker.issue.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.codesquad.issueTracker.issue.domain.Issue;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long>, IssueRepositoryCustom {
}
