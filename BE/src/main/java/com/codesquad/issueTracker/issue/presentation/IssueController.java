package com.codesquad.issueTracker.issue.presentation;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.issue.application.IssueService;
import com.codesquad.issueTracker.issue.application.dto.IssueCoversResponse;
import com.codesquad.issueTracker.issue.application.dto.IssueDetailResponse;
import com.codesquad.issueTracker.issue.application.dto.PopUpResponse;
import com.codesquad.issueTracker.issue.presentation.dto.IssueContentsRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/issues")
@RestController
public class IssueController {

    private static final Logger log = LoggerFactory.getLogger(IssueController.class);

    private final IssueService issueService;

    @GetMapping
    public ResponseEntity<IssueCoversResponse> findIssues(@RequestParam String query, @RequestAttribute Long userId) {
        log.info("userID is : {}", userId);
        return ResponseEntity.ok(issueService.findIssuesByCondition(query, userId));
    }

    @GetMapping("/{issueId}/popUp")
    public ResponseEntity<PopUpResponse> popUpIssue(@PathVariable Long issueId, @RequestAttribute Long userId) {
        return ResponseEntity.ok(issueService.popUpIssue(issueId, userId));
    }

    @PutMapping("/status")
    public ResponseEntity<Void> changeStatus(@RequestParam MultiValueMap<String, String> paramMap,
        @RequestParam String status) {
        List<Long> resultList = paramMap.get("id").stream()
            .map(Long::valueOf)
            .collect(Collectors.toList());

        issueService.changeIssuesStatus(resultList, status);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Void> makeIssue(@RequestBody IssueContentsRequest issueContentsRequest,
        @RequestAttribute Long userId) {
        issueService.makeIssue(issueContentsRequest, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<IssueDetailResponse> findIssue(@PathVariable Long id) {
        return ResponseEntity.ok(issueService.findIssue(id));
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<Void> deleteIssue(@PathVariable Long issueId, @RequestAttribute Long userId) {
        issueService.deleteIssue(issueId, userId);
        return ResponseEntity.ok().build();
    }
}
