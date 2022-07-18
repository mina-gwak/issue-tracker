package com.codesquad.issueTracker.issue.application;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.comment.domain.Comment;
import com.codesquad.issueTracker.comment.domain.CommentRepository;
import com.codesquad.issueTracker.common.infrastructure.aspect.LogExecutionTime;
import com.codesquad.issueTracker.issue.application.dto.CommentOutline;
import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.application.dto.IssueCoverResponse;
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
import com.codesquad.issueTracker.label.domain.Label;
import com.codesquad.issueTracker.label.domain.LabelRepository;
import com.codesquad.issueTracker.milestone.domain.Milestone;
import com.codesquad.issueTracker.milestone.domain.MilestoneRepository;
import com.codesquad.issueTracker.user.domain.User;
import com.codesquad.issueTracker.user.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class IssueService {

    private final QueryParser queryParser;
    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final LabelRepository labelRepository;
    private final MilestoneRepository milestoneRepository;
    private final CommentRepository commentRepository;

    @LogExecutionTime
    @Transactional(readOnly = true)
    public IssueCoversResponse findIssuesByCondition(String query, Long userId, Pageable pageable) {
        FilterCondition condition = queryParser.makeFilterCondition(query);
        List<Issue> issues = issueRepository.search(condition, userId, pageable);
        long allIssueCount = issueRepository.count();

        List<IssueCoverResponse> result = issues.stream()
            .map(IssueCoverResponse::new)
            .collect(Collectors.toList());

        long openCount, closeCount;
        if (condition.getMainFilter().equals(MainFilter.CLOSE)) {
            closeCount = result.size();
            openCount = allIssueCount - closeCount;
        } else {
            openCount = result.size();
            closeCount = allIssueCount - openCount;
        }
        return new IssueCoversResponse(result, openCount, closeCount, labelRepository.count(),
            milestoneRepository.count());
    }

    @Transactional(readOnly = true)
    public PopUpResponse popUpIssue(Long issueId, Long userId) {
        Issue issue = findSingleIssue(issueId);
        return new PopUpResponse(issue, issue.isAssignedThisUser(userId));
    }

    @Transactional
    public void changeIssuesStatus(List<Long> issueIds, String status, Long userId) {
        List<Issue> issues = issueRepository.findAllById(issueIds);
        User user = findUser(userId);
        for (Issue issue : issues) {
            changeStatusAndAddComment(status, user, issue);
        }
    }

    @Transactional
    public void makeIssue(IssueContentsRequest issueContentsRequest, Long userId) {
        User user = findUser(userId);

        Milestone milestone = milestoneRepository.findByName(issueContentsRequest.getMilestone())
            .orElseThrow(() -> new IllegalStateException("없는 마일스톤 입니다."));

        Issue issue = issueContentsRequest.toEntity(user, milestone);

        List<User> users = userRepository.findByNameIn(issueContentsRequest.getAssignees());
        issue.assignUser(users);

        List<Label> labels = labelRepository.findByNameIn(issueContentsRequest.getLabels());
        issue.attachedLabel(labels);

        issue.addFiles(issueContentsRequest.getFileUrl());

        issueRepository.save(issue);
    }

    @Transactional(readOnly = true)
    public IssueDetailResponse findIssue(Long id) {
        Issue issue = findSingleIssue(id);
        return new IssueDetailResponse(issue);
    }

    @Transactional
    public void deleteIssue(Long issueId, Long userId) {
        Issue issue = checkEditableIssue(issueId, userId);
        issueRepository.delete(issue);
    }

    @Transactional
    public void changeIssueTitle(Long issueId, ChangeIssueTitleRequest request, Long userId) {
        Issue issue = checkEditableIssue(issueId, userId);
        issue.updateTitle(request.getTitle());
    }

    @Transactional
    public void changeAssigneeList(Long issueId, ChangeAssigneesRequest request, Long userId) {
        Issue issue = checkEditableIssue(issueId, userId);
        List<User> assignees = userRepository.findByNameIn(request.getAssignees());
        issue.updateAssignee(assignees);
    }

    @Transactional
    public void changeLabelList(Long issueId, ChangeLabelsRequest request, Long userId) {
        Issue issue = checkEditableIssue(issueId, userId);
        List<Label> labels = labelRepository.findByNameIn(request.getLabels());
        issue.updateLabels(labels);
    }

    @Transactional
    public CommentOutline addComments(Long issueId, CommentsRequest request, Long userId) {
        Issue issue = findSingleIssue(issueId);
        User user = findUser(userId);
        Comment comment = new Comment(request.getContents(), LocalDateTime.now(), user, issue, true);
        Comment savedComment = commentRepository.save(comment);
        return new CommentOutline(savedComment);
    }

    @Transactional
    public void editComments(Long commentId, CommentsRequest request, Long userId) {
        Comment comment = checkEditableComments(commentId, userId);
        comment.editContent(request.getContents());
    }

    @Transactional
    public void removeComments(Long commentId, Long userId) {
        Comment comment = checkEditableComments(commentId, userId);
        comment.removeRelationWithIssue();
        commentRepository.delete(comment);
    }

    private Comment checkEditableComments(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new IllegalStateException("유효하지 않은 comment 입니다."));
        User user = findUser(userId);
        if (comment.isNotWrittenBy(user)) {
            throw new IllegalStateException("자신이 작성한 커멘트만 수정할 수 있습니다.");
        }
        return comment;
    }

    private Issue checkEditableIssue(Long issueId, Long userId) {
        Issue issue = findSingleIssue(issueId);
        User user = findUser(userId);
        if (issue.isNotWrittenBy(user)) {
            throw new IllegalStateException("자신이 작성한 이슈만 수정할 수 있습니다.");
        }
        return issue;
    }

    private void changeStatusAndAddComment(String status, User user, Issue issue) {
        issue.changeStatus(Boolean.valueOf(status));
        String message = makeStatusMessage(status);
        commentRepository.save(new Comment(message, LocalDateTime.now(), user, issue, false));
    }

    private Issue findSingleIssue(Long id) {
        return issueRepository.findById(id)
            .orElseThrow(() -> new IllegalStateException("없는 이슈입니다."));
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new IllegalStateException("없는 유저입니다."));
    }

    private String makeStatusMessage(String status) {
        if (Boolean.parseBoolean(status)) {
            return "issue가 열렸습니다.";
        }
        return "issue가 닫혔습니다.";
    }
}
