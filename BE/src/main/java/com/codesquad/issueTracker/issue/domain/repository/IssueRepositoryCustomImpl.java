package com.codesquad.issueTracker.issue.domain.repository;

import static com.codesquad.issueTracker.comment.domain.QComment.*;
import static com.codesquad.issueTracker.issue.domain.QAssignedIssue.*;
import static com.codesquad.issueTracker.issue.domain.QIssue.*;
import static com.codesquad.issueTracker.label.domain.QAttachedLabel.*;
import static com.codesquad.issueTracker.label.domain.QLabel.*;
import static com.codesquad.issueTracker.milestone.domain.QMilestone.*;
import static com.codesquad.issueTracker.user.domain.QUser.*;
import static com.querydsl.core.group.GroupBy.*;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.IssueCoverResponse;
import com.codesquad.issueTracker.issue.application.dto.LabelCoverResponse;
import com.codesquad.issueTracker.issue.application.dto.SubFilterDetail;
import com.codesquad.issueTracker.issue.domain.MainFilter;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
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

        List<IssueCoverResponse> result = queryFactory.selectFrom(issue)
            .join(issue.user, user)
            .join(issue.milestone, milestone)
            .leftJoin(issue.attachedLabels, attachedLabel)
            .leftJoin(attachedLabel.label, label)
            .where(addMainCondition(condition.getMainFilter(), userId), addSubCondition(condition.getSubFilters()))
            .distinct()
            .transform(
                groupBy(issue.id).list(
                    Projections.constructor(IssueCoverResponse.class, list(
                            Projections.constructor(LabelCoverResponse.class,
                                label.name, label.labelColor, label.textColor)
                        ), issue.title, issue.id, user.name, user.image, issue.modificationTime, milestone.name)));

        return result;
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
