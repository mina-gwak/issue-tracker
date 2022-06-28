package com.codesquad.issueTracker.issue.presentation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.issue.application.IssueService;
import com.codesquad.issueTracker.issue.application.dto.IssueCoversResponse;

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

}
