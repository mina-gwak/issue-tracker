package com.codesquad.issueTracker.unit.issue.application;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
import com.codesquad.issueTracker.comment.domain.CommentStatus;
import com.codesquad.issueTracker.common.factory.IssueFactory;
import com.codesquad.issueTracker.common.factory.LabelFactory;
import com.codesquad.issueTracker.common.factory.MilestoneFactory;
import com.codesquad.issueTracker.common.factory.UserFactory;
import com.codesquad.issueTracker.exception.comment.CommentNotEditableException;
import com.codesquad.issueTracker.exception.comment.CommentNotFoundException;
import com.codesquad.issueTracker.exception.issue.IssueNotEditableException;
import com.codesquad.issueTracker.exception.issue.IssueNotFoundException;
import com.codesquad.issueTracker.exception.user.UserNotFoundException;
import com.codesquad.issueTracker.issue.application.IssueService;
import com.codesquad.issueTracker.issue.application.dto.CommentOutline;
import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.IssueCoversResponse;
import com.codesquad.issueTracker.issue.application.dto.IssueDetailResponse;
import com.codesquad.issueTracker.issue.application.dto.PopUpResponse;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.issue.domain.MainFilter;
import com.codesquad.issueTracker.issue.domain.repository.IssueRepository;
import com.codesquad.issueTracker.issue.infrastructure.QueryParser;
import com.codesquad.issueTracker.issue.presentation.dto.ChangeAssigneesRequest;
import com.codesquad.issueTracker.issue.presentation.dto.ChangeIssueTitleRequest;
import com.codesquad.issueTracker.issue.presentation.dto.ChangeLabelsRequest;
import com.codesquad.issueTracker.issue.presentation.dto.CommentsRequest;
import com.codesquad.issueTracker.issue.presentation.dto.IssueContentsRequest;
import com.codesquad.issueTracker.label.domain.AttachedLabel;
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

        given(issueRepository.findCountByMainStatus(filterCondition, MainFilter.OPEN))
            .willReturn(10L);

        given(issueRepository.findCountByMainStatus(filterCondition, MainFilter.CLOSE))
            .willReturn(0L);

        given(labelRepository.count())
            .willReturn(5L);

        given(milestoneRepository.count())
            .willReturn(7L);

        // when
        IssueCoversResponse issueCoversResponse = issueService.findIssuesByCondition(query, userId, pageable);

        // then
        assertThat(issueCoversResponse.getIssueCoverResponses().size()).isEqualTo(10);
        assertThat(issueCoversResponse.getOpenIssueCount()).isEqualTo(10L);
        assertThat(issueCoversResponse.getCloseIssueCount()).isEqualTo(0L);
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
        List<Long> issueIds = List.of(1L, 2L, 3L);
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
            assertThat(issue.isOpened()).isFalse();
        }

        verify(commentRepository, times(3))
            .save(any(Comment.class));
    }

    @DisplayName("IssueContentsRequest로부터 정보를 받아 issue를 만들어 등록한다")
    @Test
    void make_issue() {
        // given
        long userId = 1L;
        List<String> assigneesNames = List.of("name0", "name1");
        List<String> labelNames = List.of("label1");

        User writer = UserFactory.mockSingleUser(0);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(0);
        List<User> assignees = UserFactory.mockMultipleUser(2);
        List<Label> labels = List.of(LabelFactory.mockSingleLabel(1));

        IssueContentsRequest request = new IssueContentsRequest("refactoring", "tdd",
            assigneesNames, labelNames, "mile");

        given(userRepository.findById(userId))
            .willReturn(Optional.of(writer));

        given(milestoneRepository.findByName("mile"))
            .willReturn(Optional.of(milestone));

        given(userRepository.findByNameIn(assigneesNames))
            .willReturn(Optional.of(assignees));

        given(labelRepository.findByNameIn(labelNames))
            .willReturn(Optional.of(labels));

        // when
        issueService.makeIssue(request, userId);

        // then
        verify(issueRepository, times(1))
            .save(any(Issue.class));
    }

    @DisplayName("이슈 단 건을 상세 조회한다.")
    @Test
    void find_detailed_inquiry_of_the_issue() {
        // given
        User user = UserFactory.mockSingleUser(1);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);
        Issue issue = IssueFactory.mockSingleIssue(1, user, milestone);

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.of(issue));

        // when
        IssueDetailResponse result = issueService.findIssue(1L);

        // then
        assertThat(result.getTitle()).isEqualTo(issue.getTitle());
        assertThat(result.getWriterOutline().getOptionName()).isEqualTo(user.getName());
        assertThat(result.getMilestoneInformation().getMilestoneName()).isEqualTo(milestone.getName());
    }

    @DisplayName("이슈 단 건 조회 시 내부 커멘트는 작성 시간 오름차순으로 조회된다.")
    @Test
    void comment_is_order_by_written_time() {
        // given
        User user = UserFactory.mockSingleUser(1);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);
        Issue issue = IssueFactory.mockSingleIssue(1, user, milestone);

        Comment comment1 = new Comment(1L, "content1", LocalDateTime.of(2022, 6, 3, 22, 34), user, issue,
            CommentStatus.INITIAL);
        Comment comment2 = new Comment(2L, "content1", LocalDateTime.of(2022, 6, 3, 12, 34), user, issue,
            CommentStatus.INITIAL);
        Comment comment3 = new Comment(3L, "content1", LocalDateTime.of(2021, 6, 3, 12, 34), user, issue,
            CommentStatus.INITIAL);
        Comment comment4 = new Comment(4L, "content1", LocalDateTime.of(2019, 6, 3, 12, 34), user, issue,
            CommentStatus.INITIAL);
        Comment comment5 = new Comment(5L, "content1", LocalDateTime.of(2022, 6, 3, 13, 34), user, issue,
            CommentStatus.INITIAL);

        List<Comment> comments = List.of(comment1, comment2, comment3, comment4, comment5);
        List<Long> orderedCommentIds = comments.stream()
            .sorted(Comparator.comparing(Comment::getWrittenTime))
            .map(Comment::getId)
            .collect(Collectors.toList());

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.of(issue));

        // when
        IssueDetailResponse result = issueService.findIssue(1L);

        // then
        assertThat(result.getTitle()).isEqualTo(issue.getTitle());
        assertThat(result.getWriterOutline().getOptionName()).isEqualTo(user.getName());
        assertThat(result.getMilestoneInformation().getMilestoneName()).isEqualTo(milestone.getName());
        List<Long> resultCommentIds = result.getCommentOutlines().stream()
            .map(CommentOutline::getCommentId)
            .collect(Collectors.toList());

        assertThat(resultCommentIds).isEqualTo(orderedCommentIds);

    }

    @DisplayName("이슈 단 건이 없을 경우 예외가 발생한다.")
    @Test
    void exception_occur_when_find_detailed_inquiry_of_the_issue_not_founded() {
        // given
        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.empty());

        // when  & then
        assertThrows(IssueNotFoundException.class,
            () -> issueService.findIssue(1L));
    }

    @DisplayName("작성자는 이슈를 삭제할 수 있다.")
    @Test
    void writer_can_delete_an_issue() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);
        Issue issue = IssueFactory.mockSingleIssue(1, writer, milestone);

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.of(issue));

        // when
        issueService.deleteIssue(1L, writer.getId());

        // then
        verify(issueRepository, times(1))
            .delete(issue);
    }

    @DisplayName("작성자가 아닌 다른 유저는 이슈를 삭제할 수 없다.")
    @Test
    void no_writer_can_not_delete_an_issue() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);
        Issue issue = IssueFactory.mockSingleIssue(1, writer, milestone);

        User another = UserFactory.mockSingleUserWithId(2);

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.of(issue));

        // when & then
        assertThrows(IssueNotEditableException.class,
            () -> issueService.deleteIssue(1L, another.getId()));
    }

    @DisplayName("작성자는 이슈의 타이틀을 수정할 수 있다.")
    @Test
    void writer_can_edit_issue_title() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);
        Issue issue = IssueFactory.mockSingleIssueWithId(1L, writer, milestone);

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.of(issue));

        ChangeIssueTitleRequest changedTitle = new ChangeIssueTitleRequest("changed Title");

        // when
        issueService.changeIssueTitle(issue.getId(), changedTitle, writer.getId());

        // then
        assertThat(issue.getTitle()).isEqualTo("changed Title");
    }

    @DisplayName("작성자가 아닌 다른 유저는 이슈의 타이틀을 수정할 수 없다.")
    @Test
    void no_writer_can_not_edit_issue_title() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);
        Issue issue = IssueFactory.mockSingleIssueWithId(1L, writer, milestone);

        User another = UserFactory.mockSingleUserWithId(2L);

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.of(issue));

        ChangeIssueTitleRequest changedTitle = new ChangeIssueTitleRequest("changed Title");

        // when & then
        assertThrows(IssueNotEditableException.class,
            () -> issueService.changeIssueTitle(issue.getId(), changedTitle, another.getId()));
    }

    @DisplayName("작성자만 assignee를 수정할 수 있다.")
    @Test
    void writer_can_edit_assignee_list() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);
        Issue issue = IssueFactory.mockSingleIssueWithId(1L, writer, milestone);

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.of(issue));

        ChangeAssigneesRequest request = new ChangeAssigneesRequest(List.of("user10", "user11"));
        List<User> assigneeForChange = List.of(UserFactory.mockSingleUserWithId(10L), UserFactory.mockSingleUserWithId(11L));
        given(userRepository.findByNameIn(request.getAssignees()))
            .willReturn(Optional.of(assigneeForChange));

        // when
        issueService.changeAssigneeList(issue.getId(), request, writer.getId());

        // then
        for (User user : assigneeForChange) {
            assertTrue(issue.isAssignedThisUser(user.getId()));
        }
    }

    @DisplayName("다른 사용자는 assignee를 수정할 수 없다.")
    @Test
    void no_writer_can_not_edit_assignee_list() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);
        Issue issue = IssueFactory.mockSingleIssueWithId(1L, writer, milestone);

        User another = UserFactory.mockSingleUserWithId(2L);

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.of(issue));

        ChangeAssigneesRequest request = new ChangeAssigneesRequest(List.of("user10", "user11"));

        // when & then
        assertThrows(IssueNotEditableException.class,
            () -> issueService.changeAssigneeList(issue.getId(), request, another.getId()));
    }

    @DisplayName("작성자만 label list를 수정할 수 있다.")
    @Test
    void writer_can_edit_label_list() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);
        Issue issue = IssueFactory.mockSingleIssueWithId(1L, writer, milestone);

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.of(issue));

        ChangeLabelsRequest request = new ChangeLabelsRequest(List.of("label1", "label2"));
        List<Label> labels = List.of(LabelFactory.mockSingleLabelWithId(1L), LabelFactory.mockSingleLabelWithId(2L));

        given(labelRepository.findByNameIn(request.getLabels()))
            .willReturn(Optional.of(labels));

        // when
        issueService.changeLabelList(issue.getId(), request, writer.getId());

        // then
        List<Label> resultLabel = issue.getAttachedLabels()
            .stream()
            .map(AttachedLabel::getLabel)
            .collect(Collectors.toList());

        assertThat(resultLabel).hasSameElementsAs(labels);
    }

    @DisplayName("작성자가 아니라면 label list를 수정할 수 없다.")
    @Test
    void no_writer_can_not_edit_label_list() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);
        Issue issue = IssueFactory.mockSingleIssueWithId(1L, writer, milestone);

        User another = UserFactory.mockSingleUserWithId(2L);

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.of(issue));

        ChangeLabelsRequest request = new ChangeLabelsRequest(List.of("label1", "label2"));

        // when & then
        assertThrows(IssueNotEditableException.class,
            () -> issueService.changeLabelList(issue.getId(), request, another.getId()));
    }

    @DisplayName("존재하는 이슈에 대해 누구나 댓글을 달 수 있다.")
    @Test
    void exist_issue_exist_user_add_comment() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);
        Issue issue = IssueFactory.mockSingleIssueWithId(1L, writer, milestone);

        User another = UserFactory.mockSingleUserWithId(2L);

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.of(issue));

        given(userRepository.findById(anyLong()))
            .willReturn(Optional.of(another));

        CommentsRequest commentsRequest = new CommentsRequest("it is comment");
        Comment comment = new Comment(1L, commentsRequest.getContents(), null, another, issue, CommentStatus.INITIAL);
        given(commentRepository.save(any(Comment.class)))
            .willReturn(comment);

        // when
        CommentOutline resultCommentOutline = issueService.addComments(issue.getId(), commentsRequest, another.getId());

        // then
        assertThat(resultCommentOutline.getContent()).isEqualTo("it is comment");
        assertThat(resultCommentOutline.getCommentUserOutline().getOptionName()).isEqualTo(another.getName());
        assertThat(resultCommentOutline.getCommentUserOutline().getImageUrl()).isEqualTo(another.getImage());
    }

    @DisplayName("유효하지 않은 이슈에 댓글을 달 때는 예외가 발생한다.")
    @Test
    void exception_occur_when_invalid_issue_add_comment() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Long invalidIssueId = 1L;

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.empty());

        CommentsRequest commentsRequest = new CommentsRequest("it is comment");

        // when & then
        assertThrows(IssueNotFoundException.class,
            () -> issueService.addComments(invalidIssueId, commentsRequest, writer.getId()));
    }

    @DisplayName("유효하지 않은 유저가 댓글을 달 때는 예외가 발생한다.")
    @Test
    void exception_occur_when_invalid_user_add_comment() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Milestone milestone = MilestoneFactory.mockSingleMilestone(1);
        Issue issue = IssueFactory.mockSingleIssueWithId(1L, writer, milestone);

        Long invalidUserId = 2L;

        given(issueRepository.findById(anyLong()))
            .willReturn(Optional.of(issue));

        given(userRepository.findById(anyLong()))
            .willReturn(Optional.empty());

        CommentsRequest commentsRequest = new CommentsRequest("it is comment");

        // when & then
        assertThrows(UserNotFoundException.class,
            () -> issueService.addComments(issue.getId(), commentsRequest, invalidUserId));
    }

    @DisplayName("comment 작성자는 자신이 작성한 유효한 comment를 수정할 수 있다.")
    @Test
    void comment_writer_can_edit() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Issue issue = IssueFactory.mockSingleIssueWithId(1L, writer, null);
        Comment comment = new Comment(1L, "contents", null, writer, issue, CommentStatus.INITIAL);

        given(commentRepository.findById(anyLong()))
            .willReturn(Optional.of(comment));

        CommentsRequest request = new CommentsRequest("change comment");

        // when
        issueService.editComments(comment.getId(), request, writer.getId());

        // then
        assertThat(comment.getContent()).isEqualTo("change comment");
    }

    @DisplayName("comment 작성자가 아니라면 comment를 수정할 수 없다.")
    @Test
    void no_comment_writer_can_not_edit() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Issue issue = IssueFactory.mockSingleIssueWithId(1L, writer, null);
        User commentWriter = UserFactory.mockSingleUserWithId(2L);
        Comment comment = new Comment(1L, "contents", null, commentWriter, issue, CommentStatus.INITIAL);

        given(commentRepository.findById(anyLong()))
            .willReturn(Optional.of(comment));

        CommentsRequest request = new CommentsRequest("change comment");

        // when & then
        assertThrows(CommentNotEditableException.class,
            () -> issueService.editComments(comment.getId(), request, writer.getId()));
    }

    @DisplayName("유효하지 않은 comment를 수정할 수 없다.")
    @Test
    void invalid_comment_can_not_edit() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);

        given(commentRepository.findById(anyLong()))
            .willReturn(Optional.empty());

        CommentsRequest request = new CommentsRequest("change comment");

        // when & then
        assertThrows(CommentNotFoundException.class,
            () -> issueService.editComments(1L, request, writer.getId()));
    }

    @DisplayName("comment 작성자는 자신이 작성한 유효한 comment를 제거할 수 있다.")
    @Test
    void comment_writer_can_delete() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Issue issue = IssueFactory.mockSingleIssueWithId(1L, writer, null);
        Comment comment = new Comment(1L, "contents", null, writer, issue, CommentStatus.INITIAL);

        given(commentRepository.findById(anyLong()))
            .willReturn(Optional.of(comment));

        assertThat(issue.getComments()).contains(comment);

        // when
        issueService.removeComments(comment.getId(), writer.getId());

        // then
        verify(commentRepository, times(1))
            .delete(comment);

        assertThat(issue.getComments()).isEmpty();
    }

    @DisplayName("comment 작성자가 아니라면 comment를 제거할 수 없다.")
    @Test
    void no_comment_writer_can_not_delete() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);
        Issue issue = IssueFactory.mockSingleIssueWithId(1L, writer, null);
        User commentWriter = UserFactory.mockSingleUserWithId(2L);
        Comment comment = new Comment(1L, "contents", null, commentWriter, issue, CommentStatus.INITIAL);

        given(commentRepository.findById(anyLong()))
            .willReturn(Optional.of(comment));

        // when & then
        assertThrows(CommentNotEditableException.class,
            () -> issueService.removeComments(comment.getId(), writer.getId()));
    }

    @DisplayName("유효하지 않은 comment를 제거할 수 없다.")
    @Test
    void not_invalid_comment_can_not_delete() {
        // given
        User writer = UserFactory.mockSingleUserWithId(1L);

        given(commentRepository.findById(anyLong()))
            .willReturn(Optional.empty());

        // when & then
        assertThrows(CommentNotFoundException.class,
            () -> issueService.removeComments(1L, writer.getId()));
    }

    @DisplayName("issue가 열려있는 상태에 대한 경우에만 close 요청 시 추가 comment가 작성된다.")
    @Test
    void status_init_or_reopen_only_request_close() {
        // given
        User user = UserFactory.mockSingleUserWithId(1);
        Issue issue1 = IssueFactory.mockSingleIssue(1, user, null);
        Issue issue2 = IssueFactory.mockSingleIssue(2, user, null);
        Issue issue3 = IssueFactory.mockSingleIssue(3, user, null);

        given(issueRepository.findAllById(anyList()))
            .willReturn(List.of(issue1, issue2, issue3));

        given(userRepository.findById(anyLong()))
            .willReturn(Optional.of(user));

        // when
        issueService.changeIssuesStatus(List.of(1L), "false", user.getId());

        // then
        verify(commentRepository, times(3))
            .save(any());
    }

    @DisplayName("issue가 이미 닫혀있는 상태에서 close 요청 시 추가 comment는 작성되지 않는다.")
    @Test
    void status_close_no_effect_request_close() {
        // given
        User user = UserFactory.mockSingleUserWithId(1);
        Issue issue1 = IssueFactory.mockSingleIssue(1, user, null);
        Issue issue2 = IssueFactory.mockSingleIssue(2, user, null);
        Issue issue3 = IssueFactory.mockSingleIssue(3, user, null);

        issue1.changeStatus(false);
        issue2.changeStatus(false);
        issue3.changeStatus(false);

        given(issueRepository.findAllById(anyList()))
            .willReturn(List.of(issue1, issue2, issue3));

        given(userRepository.findById(anyLong()))
            .willReturn(Optional.of(user));

        // when
        issueService.changeIssuesStatus(List.of(1L), "false", user.getId());

        // then
        verify(commentRepository, times(0))
            .save(any());
    }

    @DisplayName("issue가 닫혀있는 상태에 대한 경우에만 open 요청 시 추가 comment가 작성된다.")
    @Test
    void status_open_only_when_issue_closed_and_request_open() {
        // given
        User user = UserFactory.mockSingleUserWithId(1);
        Issue issue1 = IssueFactory.mockSingleIssue(1, user, null);
        Issue issue2 = IssueFactory.mockSingleIssue(2, user, null);
        Issue issue3 = IssueFactory.mockSingleIssue(3, user, null);

        issue1.changeStatus(false);
        issue2.changeStatus(false);
        issue3.changeStatus(false);

        given(issueRepository.findAllById(anyList()))
            .willReturn(List.of(issue1, issue2, issue3));

        given(userRepository.findById(anyLong()))
            .willReturn(Optional.of(user));

        // when
        issueService.changeIssuesStatus(List.of(1L), "true", user.getId());

        // then
        verify(commentRepository, times(3))
            .save(any());
    }

    @DisplayName("issue가 닫혀있는 상태가 아니라면 open 요청 시 추가 comment가 작성되지 않는다.")
    @Test
    void status_open_no_effect_request_open() {
        // given
        User user = UserFactory.mockSingleUserWithId(1);
        Issue issue1 = IssueFactory.mockSingleIssue(1, user, null);
        Issue issue2 = IssueFactory.mockSingleIssue(2, user, null);
        Issue issue3 = IssueFactory.mockSingleIssue(3, user, null);

        given(issueRepository.findAllById(anyList()))
            .willReturn(List.of(issue1, issue2, issue3));

        given(userRepository.findById(anyLong()))
            .willReturn(Optional.of(user));

        // when
        issueService.changeIssuesStatus(List.of(1L), "true", user.getId());

        // then
        verify(commentRepository, times(0))
            .save(any());
    }

}
