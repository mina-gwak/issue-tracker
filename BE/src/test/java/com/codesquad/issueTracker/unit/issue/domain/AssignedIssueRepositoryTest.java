package com.codesquad.issueTracker.unit.issue.domain;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;

import com.codesquad.issueTracker.common.factory.IssueFactory;
import com.codesquad.issueTracker.common.factory.MilestoneFactory;
import com.codesquad.issueTracker.common.factory.UserFactory;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.issue.domain.repository.AssignedIssueRepository;
import com.codesquad.issueTracker.issue.domain.repository.IssueRepository;
import com.codesquad.issueTracker.milestone.domain.Milestone;
import com.codesquad.issueTracker.user.domain.User;

@ActiveProfiles("test")
@DataJpaTest
public class AssignedIssueRepositoryTest {

    @Autowired
    private AssignedIssueRepository assignedIssueRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private TestEntityManager entityManager;

    @BeforeEach
    void setUp() {
        List<User> users = UserFactory.mockMultipleUser(5);
        for (User user : users) {
            entityManager.persist(user);
        }

        List<Milestone> milestones = MilestoneFactory.mockMultipleMilestone(5);
        for (Milestone milestone : milestones) {
            entityManager.persist(milestone);
        }

        List<Issue> issues = IssueFactory.mockIssueList(users, milestones);
        for (Issue issue : issues) {
            entityManager.persist(issue);
        }

        entityManager.flush();
        entityManager.clear();
    }

    @DisplayName("모든 issue로부터 할당된 assignee를 찾는다.")
    @Test
    void find_all_assignee_from_issue() {
        // given
        List<User> assigneeList1 = UserFactory.mockMultipleUser(10);
        for (User user : assigneeList1) {
            entityManager.persist(user);
        }

        List<User> assigneeList2 = assigneeList1.subList(3, 6);
        List<User> assigneeList3 = assigneeList1.subList(4, 9);

        List<Issue> issues = issueRepository.findAll();
        issues.get(1).assignUser(assigneeList2);
        issues.get(2).assignUser(assigneeList3);

        entityManager.flush();
        entityManager.clear();

        // when
        List<Long> assigneesId = assignedIssueRepository.findAssignees(
            Pageable.ofSize(10)
        );

        // then
        assertThat(assigneeList2.size()).isEqualTo(3);
        assertThat(assigneeList3.size()).isEqualTo(5);
        assertThat(assigneesId.size()).isEqualTo(6);
    }
}
