package com.codesquad.issueTracker.unit.issue.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.codesquad.issueTracker.comment.domain.Comment;
import com.codesquad.issueTracker.comment.domain.CommentRepository;
import com.codesquad.issueTracker.common.factory.IssueFactory;
import com.codesquad.issueTracker.common.factory.LabelFactory;
import com.codesquad.issueTracker.common.factory.MilestoneFactory;
import com.codesquad.issueTracker.common.factory.UserFactory;
import com.codesquad.issueTracker.issue.application.IssueService;
import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.IssueCoversResponse;
import com.codesquad.issueTracker.issue.application.dto.PopUpResponse;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.issue.domain.repository.IssueRepository;
import com.codesquad.issueTracker.issue.infrastructure.QueryParser;
import com.codesquad.issueTracker.issue.presentation.dto.IssueContentsRequest;
import com.codesquad.issueTracker.label.domain.Label;
import com.codesquad.issueTracker.label.domain.LabelRepository;
import com.codesquad.issueTracker.milestone.domain.Milestone;
import com.codesquad.issueTracker.milestone.domain.MilestoneRepository;
import com.codesquad.issueTracker.user.domain.User;
import com.codesquad.issueTracker.user.domain.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class IssueServiceTest {

    @InjectMocks
    private IssueService issueService;
    @Mock
    private QueryParser queryParser;
    @Mock
    private IssueRepository issueRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private LabelRepository labelRepository;

    @Mock
    private MilestoneRepository milestoneRepository;

    @Mock
    private CommentRepository commentRepository;

    @DisplayName("query 필터를 통해 issue 및 전체 개수 정보를 조회한다")
    @Test
    void find_issue_and_count_information_by_query_filter() {
        // given
        String query = "is:open label:BE";
        long userId = 1L;
        FilterCondition filterCondition = new FilterCondition();
        Pageable pageable = PageRequest.of(0, 10);
        given(queryParser.makeFilterCondition(query))
            .willReturn(filterCondition);

        given(issueRepository.search(filterCondition, userId, pageable))
            .willReturn(IssueFactory.mockIssueList(UserFactory.mockMultipleUser(10),
                MilestoneFactory.mockMultipleMilestone(10)));

        given(issueRepository.count())
            .willReturn(20L);

        given(labelRepository.count())
            .willReturn(5L);

        given(milestoneRepository.count())
            .willReturn(7L);

        // when
        IssueCoversResponse issueCoversResponse = issueService.findIssuesByCondition(query, userId, pageable);

        // then
        assertThat(issueCoversResponse.getIssueCoverResponses().size()).isEqualTo(10);
        assertThat(issueCoversResponse.getOpenIssueCount()).isEqualTo(10L);
        assertThat(issueCoversResponse.getLabelCount()).isEqualTo(5L);
        assertThat(issueCoversResponse.getMilestoneCount()).isEqualTo(7L);
    }

    @DisplayName("popUp용 이슈 단 건을 조회한다.")
    @Test
    void find_pop_up_issue() {
        // given
        long userId = 1L;
        long issueId = 1L;
        Issue issue = IssueFactory.mockSingleIssue(1, UserFactory.mockSingleUser(1),
            MilestoneFactory.mockSingleMilestone(1));
        given(issueRepository.findById(userId))
            .willReturn(Optional.of(issue));

        // when
        PopUpResponse response = issueService.popUpIssue(issueId, userId);

        // then
        assertThat(response.getTitle()).isEqualTo("title1");
        assertThat(response.getContent()).isEqualTo("contents1");
        assertThat(response.isAssignedMe()).isFalse();
    }

    @DisplayName("이슈 리스트의 상태를 변경하면 관련 커멘트가 추가된다.")
    @Test
    void change_issue_list_status() {
        // given
        List<Long> issueIds = List.of(0L, 1L, 2L);
        long userId = 1L;
        int issueCount = 3;
        User user = UserFactory.mockSingleUser(1);
        List<Issue> issues = IssueFactory.mockIssueList(UserFactory.mockMultipleUser(issueCount),
            MilestoneFactory.mockMultipleMilestone(issueCount));
        given(issueRepository.findAllById(issueIds))
            .willReturn(issues);
        given(userRepository.findById(userId))
            .willReturn(Optional.of(user));

        // when
        issueService.changeIssuesStatus(issueIds, "false", userId);

        // then
        for (Issue issue : issues) {
            Assertions.assertThat(issue.isOpened()).isFalse();
        }

        verify(commentRepository, times(3))
            .save(any(Comment.class));
    }

    @DisplayName("IssueContentsRequest로부터 정보를 받아 issue를 만들어 등록한다")
    @Test
    void make_issue() {
        // given
        long userId = 1L;
        List<String> files = List.of("f1", "f2");
        List<String> assigneesNames = List.of("name0", "name1");
        List<String> labelNames = List.of("label1");

        User writer = UserFactory.mockSingleUser(0);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(0);
        List<User> assignees = UserFactory.mockMultipleUser(2);
        List<Label> labels = List.of(LabelFactory.mockSingleLabel(1));

        IssueContentsRequest request = new IssueContentsRequest("refactoring", "tdd", files,
            assigneesNames, labelNames, "mile");

        given(userRepository.findById(userId))
            .willReturn(Optional.of(writer));

        given(milestoneRepository.findByName("mile"))
            .willReturn(Optional.of(milestone));

        given(userRepository.findByNameIn(assigneesNames))
            .willReturn(assignees);

        given(labelRepository.findByNameIn(labelNames))
            .willReturn(labels);

        // when
        issueService.makeIssue(request, userId);

        // then
        verify(issueRepository, times(1))
            .save(any(Issue.class));
    }

    // TODO : findIssue 부터

}
