package com.codesquad.issueTracker.unit.issue.domain;

import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import com.codesquad.issueTracker.common.factory.IssueFactory;
import com.codesquad.issueTracker.common.factory.MilestoneFactory;
import com.codesquad.issueTracker.common.factory.UserFactory;
import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.SubFilterDetail;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.issue.domain.SubFilter;
import com.codesquad.issueTracker.issue.domain.repository.IssueRepository;
import com.codesquad.issueTracker.milestone.domain.Milestone;
import com.codesquad.issueTracker.milestone.domain.MilestoneRepository;
import com.codesquad.issueTracker.user.domain.User;
import com.codesquad.issueTracker.user.domain.repository.UserRepository;

@ActiveProfiles("test")
@DataJpaTest
public class IssueRepositoryTest {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private TestEntityManager testEntityManager;

    @BeforeEach
    void setUp() {
        List<User> users = new ArrayList<>();
        List<Milestone> milestones = new ArrayList<>();

        for (int i = 0; i < 20; i++) {
            users.add(UserFactory.mockSingleUser(i));
            milestones.add(MilestoneFactory.mockSingleMilestone(i));
        }

        userRepository.saveAll(users);
        milestoneRepository.saveAll(milestones);

        List<Issue> issues = IssueFactory.mockIssueList(users, milestones);
        issueRepository.saveAll(issues);

        testEntityManager.flush();
        testEntityManager.clear();
    }

    @AfterEach
    void tearDown() {
        testEntityManager.getEntityManager()
            .createNativeQuery("ALTER TABLE issue ALTER COLUMN id RESTART WITH 1")
            .executeUpdate();

        testEntityManager.getEntityManager()
            .createNativeQuery("ALTER TABLE user ALTER COLUMN id RESTART WITH 1")
            .executeUpdate();

        testEntityManager.getEntityManager()
            .createNativeQuery("ALTER TABLE milestone ALTER COLUMN id RESTART WITH 1")
            .executeUpdate();
    }

    @DisplayName("이슈를 저장한다")
    @Test
    void save_issue() {
        User user = UserFactory.mockSingleUser(1);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);

        userRepository.save(user);
        milestoneRepository.save(milestone);

        Issue issue = IssueFactory.mockIssueList(List.of(user), List.of(milestone)).get(0);

        Issue savedIssue = issueRepository.save(issue);

        assertThat(issue).isEqualTo(savedIssue);

        testEntityManager.flush();
        testEntityManager.clear();

        Issue foundIssue = issueRepository.findById(savedIssue.getId())
            .orElseThrow();

        assertThat(foundIssue).isEqualTo(savedIssue);
    }

    @DisplayName("이슈 단 건을 id로 조회한다.")
    @Test
    void find_single_issue_by_id() {
        // when
        Issue issue = issueRepository.findById(1L)
            .orElseThrow();

        // then
        assertThat(issue.getId()).isEqualTo(1L);
        assertThat(issue.getContent()).isEqualTo("contents0");

        assertThat(issue)
            .extracting("user")
            .extracting("name").isEqualTo("name0");

        assertThat(issue)
            .extracting("milestone")
            .extracting("name").isEqualTo("mileStoneName0");
    }

    @DisplayName("issue를 작성한 writer의 아이디를 순서대로 반환한다.")
    @Test
    void find_writers_id_order_by_id() {
        // when
        List<Long> writers = issueRepository.findWriters();

        // then
        assertThat(writers).containsAll(List.of(1L, 2L, 3L));
    }

    @DisplayName("아무 조건이 없다면, Pageable에 지정된 수만 조회된다.")
    @Test
    void find_with_no_filter() {
        // given
        FilterCondition filterCondition = new FilterCondition();
        PageRequest request = PageRequest.of(0, 10);

        // when
        List<Issue> issues = issueRepository.search(filterCondition, 1L, request);

        // then
        assertThat(issues.size()).isEqualTo(10);
    }

    @DisplayName("조건 필터를 통해 조회 필터링이 가능하다.")
    @Test
    void find_with_filter_no_pageable() {
        // given
        SubFilterDetail subFilter = new SubFilterDetail(SubFilter.MILESTONE, "mileStoneName0");
        FilterCondition filterCondition = new FilterCondition();
        filterCondition.addSubFilter(subFilter);
        PageRequest request = PageRequest.of(0, 10);

        // when
        List<Issue> issues = issueRepository.search(filterCondition, 1L, request);


        // then
        assertThat(issues.size()).isEqualTo(1);
        assertThat(issues.get(0).getContent()).isEqualTo("contents0");

        assertThat(issues.get(0))
            .extracting("user")
            .extracting("name").isEqualTo("name0");

        assertThat(issues.get(0))
            .extracting("milestone")
            .extracting("name").isEqualTo("mileStoneName0");
    }

}
