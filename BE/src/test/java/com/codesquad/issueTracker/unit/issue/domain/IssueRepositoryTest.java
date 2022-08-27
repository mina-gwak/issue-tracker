package com.codesquad.issueTracker.unit.issue.domain;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;

import com.codesquad.issueTracker.comment.domain.Comment;
import com.codesquad.issueTracker.comment.domain.CommentRepository;
import com.codesquad.issueTracker.comment.domain.CommentStatus;
import com.codesquad.issueTracker.common.factory.IssueFactory;
import com.codesquad.issueTracker.common.factory.MilestoneFactory;
import com.codesquad.issueTracker.common.factory.UserFactory;
import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.SubFilterDetail;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.issue.domain.MainFilter;
import com.codesquad.issueTracker.issue.domain.SubFilter;
import com.codesquad.issueTracker.issue.domain.repository.IssueRepository;
import com.codesquad.issueTracker.label.domain.Label;
import com.codesquad.issueTracker.label.domain.LabelRepository;
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
    private LabelRepository labelRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private TestEntityManager testEntityManager;

    @BeforeEach
    void setUp() {
        testEntityManager.getEntityManager()
            .createNativeQuery("ALTER TABLE issue ALTER COLUMN id RESTART WITH 1")
            .executeUpdate();

        testEntityManager.getEntityManager()
            .createNativeQuery("ALTER TABLE user ALTER COLUMN id RESTART WITH 1")
            .executeUpdate();

        testEntityManager.getEntityManager()
            .createNativeQuery("ALTER TABLE milestone ALTER COLUMN id RESTART WITH 1")
            .executeUpdate();

        List<User> users = new ArrayList<>();
        List<Milestone> milestones = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
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

    @DisplayName("이슈를 저장한 후 id를 통해 동일한 이슈를 가져온다.")
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
        List<Long> writers = issueRepository.findWriters(Pageable.ofSize(3));

        // then
        assertThat(writers).containsAll(List.of(1L, 2L, 3L));
    }

    @DisplayName("아무 조건이 없다면, Pageable만 적용되어 조회된다.")
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

    @DisplayName("기본 메인 필터로 열린 이슈만 필터링 할 수 있다.")
    @Test
    void find_with_open_main_filter() {
        // given
        FilterCondition filterCondition = new FilterCondition();
        PageRequest request = PageRequest.of(0, 20);

        List<Issue> beforeIssues = issueRepository.search(filterCondition, 1L, request);
        assertThat(beforeIssues.size()).isEqualTo(10);
        beforeIssues.get(0).changeStatus(false);
        testEntityManager.flush();
        testEntityManager.clear();

        // when
        List<Issue> afterIssues = issueRepository.search(filterCondition, 1L, request);

        // then
        assertThat(afterIssues.size()).isEqualTo(9);
    }

    @DisplayName("CLOSE 메인 필터를 통해 닫힌 이슈만 필터링 할 수 있다.")
    @Test
    void find_with_close_main_filter() {
        // given
        FilterCondition filterCondition = new FilterCondition();
        PageRequest request = PageRequest.of(0, 20);

        List<Issue> beforeIssues = issueRepository.search(filterCondition, 1L, request);
        assertThat(beforeIssues.size()).isEqualTo(10);
        beforeIssues.get(0).changeStatus(false);
        testEntityManager.flush();
        testEntityManager.clear();

        // when
        filterCondition.changeMainFilter(MainFilter.CLOSE);
        List<Issue> afterIssues = issueRepository.search(filterCondition, 1L, request);

        // then
        assertThat(afterIssues.size()).isEqualTo(1);
    }

    @DisplayName("WRITE_BY_ME 메인 필터를 통해 사용자가 작성한 이슈만 필터링 할 수 있다.")
    @Test
    void find_with_write_by_me_main_filter() {
        // given
        User writer = userRepository.findById(1L)
            .orElseThrow();

        Issue issue1 = IssueFactory.mockSingleIssue(1, writer, null);
        Issue issue2 = IssueFactory.mockSingleIssue(1, writer, null);
        issueRepository.saveAll(List.of(issue1, issue2));

        testEntityManager.flush();
        testEntityManager.clear();

        // when
        FilterCondition filterCondition = new FilterCondition();
        filterCondition.changeMainFilter(MainFilter.WRITE_BY_ME);
        PageRequest request = PageRequest.of(0, 20);
        List<Issue> issues = issueRepository.search(filterCondition, writer.getId(), request);

        // then
        assertThat(issues.size()).isEqualTo(3);
        assertTrue(issues.stream()
            .map(Issue::getUser)
            .allMatch(user -> user.equals(writer)));
    }

    @DisplayName("ASSIGNED_ME 메인 필터를 통해 사용자에게 할당된 이슈만 필터링 할 수 있다.")
    @Test
    void find_with_assigned_me_main_filter() {
        // given
        User assignee = userRepository.findById(1L)
            .orElseThrow();

        Issue issue1 = issueRepository.findById(1L)
            .orElseThrow();

        Issue issue2 = issueRepository.findById(2L)
            .orElseThrow();

        issue1.assignUser(List.of(assignee));
        issue2.assignUser(List.of(assignee));

        testEntityManager.flush();
        testEntityManager.clear();

        // when
        FilterCondition filterCondition = new FilterCondition();
        filterCondition.changeMainFilter(MainFilter.ASSIGNED_ME);
        PageRequest request = PageRequest.of(0, 20);
        List<Issue> issues = issueRepository.search(filterCondition, assignee.getId(), request);

        // then
        assertThat(issues.size()).isEqualTo(2);
        assertTrue(issues.stream()
            .allMatch(issue -> issue.isAssignedThisUser(assignee.getId())));
    }

    @DisplayName("ADD_COMMENT_BY_ME 메인 필터를 통해 사용자가 커멘트를 작성한 이슈만 필터링 할 수 있다.")
    @Test
    void find_with_add_comment_by_me_main_filter() {
        // given
        User commenter = userRepository.findById(1L)
            .orElseThrow();

        Issue issue1 = issueRepository.findById(1L)
            .orElseThrow();

        Issue issue2 = issueRepository.findById(2L)
            .orElseThrow();

        Comment comment1 = new Comment("content1", null, commenter, issue1, CommentStatus.INITIAL);
        Comment comment2 = new Comment("content2", null, commenter, issue2, CommentStatus.INITIAL);

        commentRepository.saveAll(List.of(comment1, comment2));

        testEntityManager.flush();
        testEntityManager.clear();

        // when
        FilterCondition filterCondition = new FilterCondition();
        filterCondition.changeMainFilter(MainFilter.ADD_COMMENT_BY_ME);
        PageRequest request = PageRequest.of(0, 20);
        List<Issue> issues = issueRepository.search(filterCondition, commenter.getId(), request);

        // then
        assertThat(issues.size()).isEqualTo(2);
    }

    @Nested
    @DisplayName("라벨이 등록된 상태에서")
    class given_the_label {

        private Label label1;
        private Label label2;
        private Label label3;

        @BeforeEach
        void setUp() {
            label1 = new Label("label1", "first label", "blue", "white");
            label2 = new Label("label2", "second label", "green", "grey");
            label3 = new Label("label3", "third label", "yellow", "black");

            labelRepository.saveAll(List.of(label1, label2, label3));
            testEntityManager.flush();
            testEntityManager.clear();
        }

        @DisplayName("하나의 라벨 필터를 통한 라벨 필터링이 가능하다.")
        @ParameterizedTest
        @CsvSource({"label1, 1", "label2, 0"})
        void find_with_one_label(String labelName, int resultSize) {
            // given
            Issue issue = issueRepository.findById(1L)
                .orElseThrow();

            issue.attachedLabel(List.of(label1));

            testEntityManager.flush();
            testEntityManager.clear();

            // when
            FilterCondition filterCondition = new FilterCondition();
            SubFilterDetail subFilter = new SubFilterDetail(SubFilter.LABELS, labelName);
            filterCondition.addSubFilter(subFilter);
            PageRequest request = PageRequest.of(0, 10);

            List<Issue> issues = issueRepository.search(filterCondition, 1L, request);

            // then
            assertThat(issues.size()).isEqualTo(resultSize);
        }

        @DisplayName("두 개 이상의 라벨 필터를 통해 or 조건으로 라벨 필터링이 가능하다.")
        @Test
        void find_with_more_than_two_label() {
            // given
            Issue issue1 = issueRepository.findById(1L)
                .orElseThrow();

            Issue issue2 = issueRepository.findById(2L)
                .orElseThrow();

            issue1.attachedLabel(List.of(label2));
            issue2.attachedLabel(List.of(label2, label3));

            testEntityManager.flush();
            testEntityManager.clear();

            // when
            FilterCondition filterCondition = new FilterCondition();
            SubFilterDetail subFilter1 = new SubFilterDetail(SubFilter.LABELS, "label2");
            SubFilterDetail subFilter2 = new SubFilterDetail(SubFilter.LABELS, "label3");
            filterCondition.addSubFilter(subFilter1);
            filterCondition.addSubFilter(subFilter2);
            PageRequest request = PageRequest.of(0, 10);

            List<Issue> issues = issueRepository.search(filterCondition, 1L, request);

            // then
            assertThat(issues).hasSize(2).hasSameElementsAs(List.of(issue1, issue2));
        }
    }

    @Nested
    @DisplayName("마일스톤이 등록된 상태에서")
    class given_the_milestone {
        private Milestone milestone1;
        private Milestone milestone2;
        private Milestone milestone3;

        private List<Milestone> milestones;

        @BeforeEach
        void setUp() {
            milestone1 = new Milestone("m1", null, "description1");
            milestone2 = new Milestone("m2", null, "description2");
            milestone3 = new Milestone("m3", null, "description3");

            milestones = List.of(milestone1, milestone2, milestone3);
            milestoneRepository.saveAll(milestones);
        }

        @DisplayName("하나의 마일스톤 이름으로 마일스톤 필터링이 가능하다.")
        @Test
        void find_with_one_label() {
            // given
            User user = userRepository.findById(1L)
                .orElseThrow();

            Issue issue1 = new Issue("title1", "content1", null, null, user, milestone1);
            Issue issue2 = new Issue("title2", "content2", null, null, user, null);

            issueRepository.saveAll(List.of(issue1, issue2));
            testEntityManager.flush();
            testEntityManager.clear();

            // when
            FilterCondition filterCondition = new FilterCondition();
            SubFilterDetail subFilter = new SubFilterDetail(SubFilter.MILESTONES, "m1");
            filterCondition.addSubFilter(subFilter);
            PageRequest request = PageRequest.of(0, 10);
            List<Issue> issues = issueRepository.search(filterCondition, 1L, request);

            // then
            assertThat(issues.size()).isEqualTo(1);
            assertThat(issues.get(0)).isEqualTo(issue1);
        }

        @DisplayName("필터에 마일스톤 여러개를 지정해서 or 조건으로 검사할 수 있다.")
        @Test
        void find_with_multiple_milestone() {
            // given
            User user = userRepository.findById(1L)
                .orElseThrow();
            Issue issue1 = new Issue("title", "content", null, null, user, milestone1);
            Issue issue2 = new Issue("title", "content", null, null, user, milestone2);
            Issue issue3 = new Issue("title", "content", null, null, user, milestone3);

            List<Issue> issues = List.of(issue1, issue2, issue3);
            issueRepository.saveAll(List.of(issue1, issue2, issue3));
            testEntityManager.flush();
            testEntityManager.clear();

            // when
            FilterCondition filterCondition = new FilterCondition();
            SubFilterDetail subFilter1 = new SubFilterDetail(SubFilter.MILESTONES, "m1");
            SubFilterDetail subFilter2 = new SubFilterDetail(SubFilter.MILESTONES, "m2");
            SubFilterDetail subFilter3 = new SubFilterDetail(SubFilter.MILESTONES, "m3");
            filterCondition.addSubFilter(subFilter1);
            filterCondition.addSubFilter(subFilter2);
            filterCondition.addSubFilter(subFilter3);
            PageRequest request = PageRequest.of(0, 10);
            List<Issue> findIssues = issueRepository.search(filterCondition, 1L, request);

            // then
            assertThat(findIssues).hasSize(issues.size()).hasSameElementsAs(issues);
        }
    }

    @DisplayName("하나의 Assignee 이름으로 Assignee 필터링이 가능하다.")
    @Test
    void find_with_single_Assignee() {
        // given
        Issue issue1 = issueRepository.findById(1L)
            .orElseThrow();

        Issue issue2 = issueRepository.findById(2L)
            .orElseThrow();

        User user1 = userRepository.findByName("name1")
            .orElseThrow();

        User user2 = userRepository.findByName("name2")
            .orElseThrow();

        issue1.assignUser(List.of(user1, user2));
        issue2.assignUser(List.of(user2));

        testEntityManager.flush();
        testEntityManager.clear();

        // when
        FilterCondition filterCondition = new FilterCondition();
        SubFilterDetail subFilter = new SubFilterDetail(SubFilter.ASSIGNEES, "name1");
        filterCondition.addSubFilter(subFilter);
        PageRequest request = PageRequest.of(0, 10);
        List<Issue> findIssues = issueRepository.search(filterCondition, 1L, request);

        // then
        assertThat(findIssues.size()).isEqualTo(1);
        assertThat(findIssues.get(0)).isEqualTo(issue1);
    }

    @DisplayName("여러 Assignee 이름으로 Assignee OR 필터링이 가능하다.")
    @Test
    void find_with_multiple_Assignee() {
        // given
        Issue issue1 = issueRepository.findById(1L)
            .orElseThrow();

        Issue issue2 = issueRepository.findById(2L)
            .orElseThrow();

        User user1 = userRepository.findByName("name1")
            .orElseThrow();

        User user2 = userRepository.findByName("name2")
            .orElseThrow();

        issue1.assignUser(List.of(user1, user2));
        issue2.assignUser(List.of(user2));

        testEntityManager.flush();
        testEntityManager.clear();

        // when
        FilterCondition filterCondition = new FilterCondition();
        SubFilterDetail subFilter1 = new SubFilterDetail(SubFilter.ASSIGNEES, "name1");
        SubFilterDetail subFilter2 = new SubFilterDetail(SubFilter.ASSIGNEES, "name2");
        filterCondition.addSubFilter(subFilter1);
        filterCondition.addSubFilter(subFilter2);
        PageRequest request = PageRequest.of(0, 10);
        List<Issue> findIssues = issueRepository.search(filterCondition, 1L, request);

        // then
        assertThat(findIssues).hasSize(2).hasSameElementsAs(List.of(issue1, issue2));
    }

    @DisplayName("메인필터 하나와 서브필터 여러 개로 이슈를 조회할 수 있다.")
    @Test
    void find_with_main_and_sub_filter() {
        // given
        Issue issue1 = issueRepository.findById(1L)
            .orElseThrow();

        Issue issue2 = issueRepository.findById(2L)
            .orElseThrow();

        Issue issue3 = issueRepository.findById(3L)
            .orElseThrow();

        issue1.changeStatus(Boolean.FALSE);
        issue2.changeStatus(Boolean.FALSE);
        issue3.changeStatus(Boolean.FALSE);

        Label label1 = new Label("label1", "desc1", "white", "black");
        labelRepository.save(label1);

        issue1.attachedLabel(List.of(label1));
        issue2.attachedLabel(List.of(label1));

        User user1 = new User("testUser", "testNickname", "img");
        userRepository.save(user1);

        issue1.assignUser(List.of(user1));

        testEntityManager.flush();
        testEntityManager.clear();

        // when
        FilterCondition filterCondition = new FilterCondition();
        filterCondition.changeMainFilter(MainFilter.CLOSE);
        SubFilterDetail subFilter1 = new SubFilterDetail(SubFilter.LABELS, "label1");
        SubFilterDetail subFilter2 = new SubFilterDetail(SubFilter.ASSIGNEES, "testUser");
        filterCondition.addSubFilter(subFilter1);
        filterCondition.addSubFilter(subFilter2);
        PageRequest request = PageRequest.of(0, 10);
        List<Issue> findIssues = issueRepository.search(filterCondition, 1L, request);

        // then
        assertThat(findIssues).hasSize(1).hasSameElementsAs(List.of(issue1));
    }

    @DisplayName("메인 assignee_me 필터와 서브 assignee 필터가 동시에 선택될 경우, 서브 assignee 필터가 적용된다.")
    @Test
    void apply_sub_when_main_assignee_and_sub_assignee_filter_the_same_time() {
        // given
        Issue mainUserAssignedIssue = issueRepository.findById(1L)
            .orElseThrow();

        Issue subUserAssignedIssue = issueRepository.findById(2L)
            .orElseThrow();

        User mainUser = userRepository.findById(1L)
            .orElseThrow();

        User subUser = userRepository.findById(2L)
            .orElseThrow();

        mainUserAssignedIssue.assignUser(List.of(mainUser));
        subUserAssignedIssue.assignUser(List.of(subUser));

        // when
        FilterCondition filterCondition = new FilterCondition();
        filterCondition.changeMainFilter(MainFilter.ASSIGNED_ME);
        SubFilterDetail subFilter = new SubFilterDetail(SubFilter.ASSIGNEES, subUser.getName());
        filterCondition.addSubFilter(subFilter);
        PageRequest request = PageRequest.of(0, 10);
        List<Issue> findIssues = issueRepository.search(filterCondition, mainUser.getId(), request);

        // then
        assertThat(findIssues).hasSize(1).hasSameElementsAs(List.of(subUserAssignedIssue));
    }
}
