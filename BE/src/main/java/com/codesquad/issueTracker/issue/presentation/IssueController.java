package com.codesquad.issueTracker.issue.presentation;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.issue.application.IssueService;
import com.codesquad.issueTracker.issue.application.dto.CommentOutline;
import com.codesquad.issueTracker.issue.application.dto.IssueCoversResponse;
import com.codesquad.issueTracker.issue.application.dto.IssueDetailResponse;
import com.codesquad.issueTracker.issue.application.dto.PopUpResponse;
import com.codesquad.issueTracker.issue.presentation.dto.ChangeAssigneesRequest;
import com.codesquad.issueTracker.issue.presentation.dto.ChangeIssueContentsRequest;
import com.codesquad.issueTracker.issue.presentation.dto.ChangeIssueTitleRequest;
import com.codesquad.issueTracker.issue.presentation.dto.ChangeLabelsRequest;
import com.codesquad.issueTracker.issue.presentation.dto.CommentsRequest;
import com.codesquad.issueTracker.issue.presentation.dto.IssueContentsRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/issues")
@RestController
public class IssueController {

    private static final Logger log = LoggerFactory.getLogger(IssueController.class);

    private final IssueService issueService;

    @GetMapping
    public ResponseEntity<IssueCoversResponse> findIssues(
        @PageableDefault Pageable pageable, @RequestParam String query, @RequestAttribute Long userId) {
        return ResponseEntity.ok(issueService.findIssuesByCondition(query, userId, pageable));
    }

    @GetMapping("/{issueId}/popUp")
    public ResponseEntity<PopUpResponse> popUpIssue(@PathVariable Long issueId, @RequestAttribute Long userId) {
        return ResponseEntity.ok(issueService.popUpIssue(issueId, userId));
    }

    @PostMapping("/status")
    public ResponseEntity<Void> changeStatus(@RequestParam MultiValueMap<String, String> paramMap,
        @RequestParam String status, @RequestAttribute Long userId) {
        List<Long> resultList = paramMap.get("id").stream()
            .map(Long::valueOf)
            .collect(Collectors.toList());

        issueService.changeIssuesStatus(resultList, status, userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Void> makeIssue(@RequestBody IssueContentsRequest issueContentsRequest,
        @RequestAttribute Long userId) {
        issueService.makeIssue(issueContentsRequest, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<IssueDetailResponse> findIssue(@PathVariable Long id,
        @RequestAttribute Long userId) {
        return ResponseEntity.ok(issueService.findIssue(id, userId));
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<Void> deleteIssue(@PathVariable Long issueId, @RequestAttribute Long userId) {
        issueService.deleteIssue(issueId, userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{issueId}/title")
    public ResponseEntity<Void> changeIssueTitle(
        @PathVariable Long issueId,
        @RequestBody ChangeIssueTitleRequest request,
        @RequestAttribute Long userId) {
        issueService.changeIssueTitle(issueId, request, userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{issueId}")
    public ResponseEntity<Void> changeIssueContents(
        @PathVariable Long issueId,
        @RequestBody ChangeIssueContentsRequest request,
        @RequestAttribute Long userId) {
        issueService.changeIssueContents(issueId, request, userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{issueId}/assignees")
    public ResponseEntity<Void> changeAssigneeList(
        @PathVariable Long issueId,
        @RequestBody ChangeAssigneesRequest request,
        @RequestAttribute Long userId) {
        issueService.changeAssigneeList(issueId, request, userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{issueId}/labels")
    public ResponseEntity<Void> changeLabelList(
        @PathVariable Long issueId,
        @RequestBody ChangeLabelsRequest request,
        @RequestAttribute Long userId) {
        issueService.changeLabelList(issueId, request, userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{issueId}/comments")
    public ResponseEntity<CommentOutline> addComment(
        @PathVariable Long issueId,
        @RequestBody CommentsRequest request,
        @RequestAttribute Long userId) {
        return ResponseEntity.ok(issueService.addComments(issueId, request, userId));
    }

    @PatchMapping("/{commentId}/comments")
    public ResponseEntity<Void> editComment(
        @PathVariable Long commentId,
        @RequestBody CommentsRequest request,
        @RequestAttribute Long userId) {
        issueService.editComments(commentId, request, userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{commentId}/comments")
    public ResponseEntity<Void> removeComment(@PathVariable Long commentId, @RequestAttribute Long userId) {
        issueService.removeComments(commentId, userId);
        return ResponseEntity.ok().build();
    }
}
