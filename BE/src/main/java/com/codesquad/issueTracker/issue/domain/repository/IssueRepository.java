package com.codesquad.issueTracker.issue.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.codesquad.issueTracker.issue.domain.Issue;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long>, IssueRepositoryCustom {
    @Override
    @EntityGraph(
        attributePaths = {"user", "comments",
            "attachedLabels", "attachedLabels.label", "attachedLabels.issue",
            "assignedIssues", "assignedIssues.issue", "assignedIssues.user",
            "images", "milestone", "milestone.issues",
            "comments", "comments.user"},
        type = EntityGraph.EntityGraphType.LOAD)
    Optional<Issue> findById(Long aLong);

    @Query("SELECT DISTINCT i.user.id FROM Issue i ORDER BY i.user.id")
    List<Long> findWriters(Pageable pageable);

}
