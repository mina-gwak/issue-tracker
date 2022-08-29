package com.codesquad.issueTracker.issue.application;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.comment.domain.Comment;
import com.codesquad.issueTracker.comment.domain.CommentRepository;
import com.codesquad.issueTracker.comment.domain.CommentStatus;
import com.codesquad.issueTracker.exception.comment.CommentNotEditableException;
import com.codesquad.issueTracker.exception.comment.CommentNotFoundException;
import com.codesquad.issueTracker.exception.issue.IssueNotEditableException;
import com.codesquad.issueTracker.exception.issue.IssueNotFoundException;
import com.codesquad.issueTracker.exception.label.LabelNotFoundException;
import com.codesquad.issueTracker.exception.user.UserNotFoundException;
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

    @Transactional(readOnly = true)
    public IssueCoversResponse findIssuesByCondition(String query, Long userId, Pageable pageable) {
        FilterCondition condition = queryParser.makeFilterCondition(query);
        List<Issue> issues = issueRepository.search(condition, userId, pageable);

        List<IssueCoverResponse> result = issues.stream()
            .map(IssueCoverResponse::new)
            .collect(Collectors.toList());

        Long openCount = issueRepository.findCountByMainStatus(condition, MainFilter.OPEN);
        Long closeCount = issueRepository.findCountByMainStatus(condition, MainFilter.CLOSE);

        return new IssueCoversResponse(result, openCount, closeCount, labelRepository.count(),
            milestoneRepository.count());
    }

    @Cacheable(value = "PopUpResponse", key = "#issueId", cacheManager = "cacheManager", unless = "#issueId == ''")
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
        Issue issue = makeBasicIssue(issueContentsRequest, userId);
        assignAdditional(issueContentsRequest, issue);
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
        List<User> assignees = userRepository.findByNameIn(request.getAssignees())
            .orElseThrow(UserNotFoundException::new);
        issue.updateAssignee(assignees);
    }

    @Transactional
    public void changeLabelList(Long issueId, ChangeLabelsRequest request, Long userId) {
        Issue issue = checkEditableIssue(issueId, userId);
        List<Label> labels = labelRepository.findByNameIn(request.getLabels())
            .orElseThrow(LabelNotFoundException::new);
        issue.updateLabels(labels);
    }

    @Transactional
    public CommentOutline addComments(Long issueId, CommentsRequest request, Long userId) {
        Issue issue = findSingleIssue(issueId);
        User user = findUser(userId);
        Comment comment = new Comment(request.getContents(), LocalDateTime.now(), user, issue, CommentStatus.INITIAL);
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
        Comment comment = findSingleComment(commentId);
        if (comment.isNotWrittenBy(userId)) {
            throw new CommentNotEditableException();
        }
        return comment;
    }

    private Issue checkEditableIssue(Long issueId, Long userId) {
        Issue issue = findSingleIssue(issueId);
        if (issue.isNotWrittenBy(userId)) {
            throw new IssueNotEditableException();
        }
        return issue;
    }

    private void changeStatusAndAddComment(String status, User user, Issue issue) {
        boolean statusValue = Boolean.parseBoolean(status);
        if (issue.isOpened() && !statusValue) {
            issue.changeStatus(false);
            commentRepository.save(new Comment("issue가 닫혔습니다.", LocalDateTime.now(), user, issue, CommentStatus.CLOSED));
            return;
        }
        if (!issue.isOpened() && statusValue) {
            issue.changeStatus(true);
            commentRepository.save(new Comment("issue가 다시 열렸습니다.", LocalDateTime.now(), user, issue, CommentStatus.REOPEN));
        }
    }

    private Issue findSingleIssue(Long id) {
        return issueRepository.findById(id)
            .orElseThrow(IssueNotFoundException::new);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(UserNotFoundException::new);
    }

    private Comment findSingleComment(Long commentId) {
        return commentRepository.findById(commentId)
            .orElseThrow(CommentNotFoundException::new);
    }

    private Issue makeBasicIssue(IssueContentsRequest issueContentsRequest, Long userId) {
        User user = findUser(userId);
        Milestone milestone = milestoneRepository.findByName(issueContentsRequest.getMilestone())
            .orElse(null);
        return issueContentsRequest.toEntity(user, milestone);
    }

    private void assignAdditional(IssueContentsRequest issueContentsRequest, Issue issue) {
        List<User> users = userRepository.findByNameIn(issueContentsRequest.getAssignees())
            .orElseThrow(UserNotFoundException::new);
        issue.assignUser(users);

        List<Label> labels = labelRepository.findByNameIn(issueContentsRequest.getLabels())
            .orElseThrow(LabelNotFoundException::new);
        issue.attachedLabel(labels);
    }
}
