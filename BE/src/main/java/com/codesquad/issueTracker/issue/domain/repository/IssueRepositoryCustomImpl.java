package com.codesquad.issueTracker.issue.domain.repository;

import static com.codesquad.issueTracker.comment.domain.QComment.*;
import static com.codesquad.issueTracker.issue.domain.QAssignedIssue.*;
import static com.codesquad.issueTracker.issue.domain.QIssue.*;
import static com.codesquad.issueTracker.label.domain.QAttachedLabel.*;
import static com.codesquad.issueTracker.label.domain.QLabel.*;
import static com.codesquad.issueTracker.milestone.domain.QMilestone.*;
import static com.codesquad.issueTracker.user.domain.QUser.*;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.util.MultiValueMap;

import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.SubFilterDetail;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.issue.domain.MainFilter;
import com.codesquad.issueTracker.user.domain.QUser;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringPath;
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
    public List<Issue> search(FilterCondition condition, Long userId) {

        QUser assignedUser = new QUser("assignedUser");
        MultiValueMap<String, SubFilterDetail> subFilters = condition.getSubFilters();

        return queryFactory.selectFrom(issue)
            .join(issue.user, user).fetchJoin()
            .leftJoin(issue.assignedIssues, assignedIssue)
            .leftJoin(assignedIssue.user, assignedUser)
            .leftJoin(issue.comments, comment)
            .leftJoin(issue.milestone, milestone).fetchJoin()
            .leftJoin(issue.attachedLabels, attachedLabel)
            .leftJoin(attachedLabel.label, label)

            .where(
                addMainCondition(condition.getMainFilter(), userId, assignedUser),
                matching(milestone.name, subFilters.get("MILESTONE")),
                matching(label.name, subFilters.get("LABEL")),
                matching(assignedUser.name, subFilters.get("ASSIGNEE")))
            .distinct()
            .fetch();
    }

    private BooleanBuilder matching(StringPath name, List<SubFilterDetail> filters) {
        if (filters == null) {
            return null;
        }
        BooleanBuilder condition = new BooleanBuilder();
        for (SubFilterDetail filter : filters) {
            condition.or(name.eq(filter.getValue()));
        }
        return condition;
    }

    private Predicate addMainCondition(MainFilter condition, Long userId,
        QUser assignedUser) {
        if (condition.equals(MainFilter.WRITE_BY_ME)) {
            return issue.user.id.eq(userId);
        }
        if (condition.equals(MainFilter.ADD_COMMENT_BY_ME)) {
            return comment.user.id.eq(userId);
        }
        // TODO : 만약 이 필터이며, subfilter에서 Assign_me도 할당된다면?
        if (condition.equals(MainFilter.ASSIGNED_ME)) {
            return assignedUser.id.eq(userId);
        }
        return null;
    }
}
