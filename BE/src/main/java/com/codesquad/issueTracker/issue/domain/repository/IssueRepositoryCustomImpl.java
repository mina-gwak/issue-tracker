package com.codesquad.issueTracker.issue.domain.repository;

import static com.codesquad.issueTracker.comment.domain.QComment.*;
import static com.codesquad.issueTracker.issue.domain.QAssignedIssue.*;
import static com.codesquad.issueTracker.issue.domain.QIssue.*;
import static com.codesquad.issueTracker.label.domain.QAttachedLabel.*;
import static com.codesquad.issueTracker.milestone.domain.QMilestone.*;
import static com.codesquad.issueTracker.user.domain.QUser.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.codesquad.issueTracker.comment.domain.Comment;
import com.codesquad.issueTracker.issue.application.dto.IssueCoverResponse;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.issue.domain.MainFilter;
import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.SubFilterDetail;
import com.codesquad.issueTracker.label.domain.AttachedLabel;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class IssueRepositoryCustomImpl implements IssueRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public IssueRepositoryCustomImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<IssueCoverResponse> search(FilterCondition condition, Long userId) {

        JPAQuery<Issue> query = queryFactory.selectFrom(issue)
            .leftJoin(issue.user, user)
            .leftJoin(issue.milestone, milestone)
            .leftJoin(issue.attachedLabels, attachedLabel)
            .fetchJoin()
            .leftJoin(issue.comments, comment)
            .fetchJoin()
            .leftJoin(issue.assignedIssues, assignedIssue)
            .fetchJoin()
            .where(addMainCondition(condition.getMainFilter(), userId), addSubCondition(condition.getSubFilters()))
            .distinct();

        List<Issue> result = query.fetch();

        log.info("result size : {}", result.size());

        for (Issue issue : result) {
            log.info("===============issue================");
            log.info("issue is : {}, written by : {}, ", issue.getId(), issue.getUser().getName());
            Set<Comment> comments = issue.getComments();
            for (Comment comment1 : comments) {
                log.info("comment id : {}, content : {}", comment1.getId(), comment1.getContent());
            }
            for (AttachedLabel attachedLabel : issue.getAttachedLabels()) {
                log.info("label is : {}", attachedLabel.getLabel().getName());
            }
            log.info("=================================");
        }

        return result.stream()
            .map(IssueCoverResponse::new)
            .collect(Collectors.toList());
    }

    private Predicate addMainCondition(MainFilter condition, Long userId) {
        if(condition.equals(MainFilter.CLOSE)) {
            return issue.isOpened.isFalse();
        }
        if (condition.equals(MainFilter.WRITE_BY_ME)) {
            return issue.user.id.eq(userId);
        }
        if (condition.equals(MainFilter.ADD_COMMENT_BY_ME)) {
            return comment.user.id.eq(userId);
        }
        if (condition.equals(MainFilter.ASSIGNED_ME)) {
            return assignedIssue.user.id.eq(userId);
        }
        return issue.isOpened.isTrue();
    }

    private Predicate addSubCondition(List<SubFilterDetail> subFilters) {
        return null;
    }
}
