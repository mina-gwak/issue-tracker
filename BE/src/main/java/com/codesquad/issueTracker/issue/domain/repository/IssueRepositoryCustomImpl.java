package com.codesquad.issueTracker.issue.domain.repository;

import static com.codesquad.issueTracker.comment.domain.QComment.*;
import static com.codesquad.issueTracker.issue.domain.QAssignedIssue.*;
import static com.codesquad.issueTracker.issue.domain.QAttachedLabel.*;
import static com.codesquad.issueTracker.issue.domain.QIssue.*;
import static com.codesquad.issueTracker.label.domain.QLabel.*;
import static com.codesquad.issueTracker.milestone.domain.QMilestone.*;
import static com.codesquad.issueTracker.user.domain.QUser.*;
import static com.querydsl.core.group.GroupBy.*;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.MultiValueMap;

import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.IssueCoverResponse;
import com.codesquad.issueTracker.issue.application.dto.LabelCoverResponse;
import com.codesquad.issueTracker.issue.application.dto.SubFilterDetail;
import com.codesquad.issueTracker.issue.domain.MainFilter;
import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;
import com.codesquad.issueTracker.user.domain.QUser;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
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
    public Page<IssueCoverResponse> search(FilterCondition condition, Long userId, Pageable pageable) {
        QUser assignedUser = new QUser("assignedUser");
        MultiValueMap<String, SubFilterDetail> subFilters = condition.getSubFilters();

        List<Long> ids = queryFactory
            .select(issue.id)
            .from(issue)
            .join(issue.user, user)
            .leftJoin(issue.milestone, milestone)

            .leftJoin(issue.comments, comment)
            .leftJoin(issue.assignedIssues, assignedIssue)
            .leftJoin(assignedIssue.user, assignedUser)

            .leftJoin(issue.attachedLabels, attachedLabel)
            .leftJoin(attachedLabel.label, label)
            .where(
                addMainCondition(condition.getMainFilter(), userId, assignedUser),
                matching(issue.user.name, subFilters.get("WRITERS")),
                matching(milestone.name, subFilters.get("MILESTONES")),
                matching(assignedUser.name, subFilters.get("ASSIGNEES")),
                matching(label.name, subFilters.get("LABELS")))
            .distinct()
            .fetch();

        List<IssueCoverResponse> issueCoverResponses = queryFactory
            .selectFrom(issue)
            .join(issue.user, user)
            .leftJoin(issue.milestone, milestone)
            .leftJoin(issue.assignedIssues, assignedIssue)
            .leftJoin(assignedIssue.user, assignedUser)
            .leftJoin(issue.attachedLabels, attachedLabel)
            .leftJoin(attachedLabel.label, label)
            .where(issue.id.in(ids))
            .orderBy(issue.modificationTime.desc())
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .transform(
                groupBy(issue.id).list(
                    Projections.constructor(IssueCoverResponse.class,
                        set(Projections.constructor(LabelCoverResponse.class,
                            label.name, label.labelColor, label.textColor)),
                        set(Projections.constructor(UserOutlineResponse.class,
                            assignedUser.name, assignedUser.image)),
                        issue.title, issue.id, issue.user.name, issue.user.image,
                        issue.modificationTime, issue.milestone.name, issue.isOpened)));

        return PageableExecutionUtils.getPage(issueCoverResponses, pageable, ids::size);
    }

    @Override
    public Long findCountByMainStatus(FilterCondition condition, MainFilter mainFilter) {
        QUser assignedUser = new QUser("assignedUser");
        MultiValueMap<String, SubFilterDetail> subFilters = condition.getSubFilters();
        return queryFactory.select(issue.countDistinct())
            .from(issue)
            .leftJoin(issue.milestone, milestone)
            .leftJoin(issue.assignedIssues, assignedIssue)
            .leftJoin(assignedIssue.user, assignedUser)
            .leftJoin(issue.comments, comment)
            .leftJoin(issue.attachedLabels, attachedLabel)
            .leftJoin(attachedLabel.label, label)
            .where(
                addMainCondition(mainFilter),
                matching(milestone.name, subFilters.get("MILESTONES")),
                matching(label.name, subFilters.get("LABELS")),
                matching(assignedUser.name, subFilters.get("ASSIGNEES")),
                matching(issue.user.name, subFilters.get("WRITERS")))
            .fetchOne();
    }

    private BooleanBuilder matching(StringPath name, List<SubFilterDetail> filters) {
        BooleanBuilder condition = new BooleanBuilder();
        if (filters == null) {
            return condition;
        }
        for (SubFilterDetail filter : filters) {
            condition.or(name.eq(filter.getValue()));
        }
        return condition;
    }

    private Predicate addMainCondition(MainFilter condition, Long userId,
        QUser assignedUser) {
        if (condition.equals(MainFilter.CLOSE)) {
            return issue.isOpened.eq(false);
        }
        if (condition.equals(MainFilter.WRITE_BY_ME)) {
            return issue.user.id.eq(userId);
        }
        if (condition.equals(MainFilter.ADD_COMMENT_BY_ME)) {
            return comment.user.id.eq(userId);
        }
        if (condition.equals(MainFilter.ASSIGNED_ME)) {
            return assignedUser.id.eq(userId);
        }
        return issue.isOpened.eq(true);
    }

    private Predicate addMainCondition(MainFilter mainFilter) {
        if (mainFilter.equals(MainFilter.OPEN)) {
            return issue.isOpened.eq(true);
        }
        return issue.isOpened.eq(false);
    }
}
