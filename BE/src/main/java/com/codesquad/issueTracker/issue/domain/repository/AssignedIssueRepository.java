package com.codesquad.issueTracker.issue.domain.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.codesquad.issueTracker.issue.domain.AssignedIssue;

public interface AssignedIssueRepository extends JpaRepository<AssignedIssue, Long> {

    @Query("SELECT DISTINCT ai.user.id FROM AssignedIssue ai ORDER BY ai.user.id")
    List<Long> findAssignees(Pageable pageable);
}
