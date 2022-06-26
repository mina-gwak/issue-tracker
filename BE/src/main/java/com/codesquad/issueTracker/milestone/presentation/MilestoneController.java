package com.codesquad.issueTracker.milestone.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.issue.application.dto.FilterOutlineResponse;
import com.codesquad.issueTracker.issue.application.dto.FilterOutlinesResponse;
import com.codesquad.issueTracker.milestone.application.MilestoneService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/milestones")
@RequiredArgsConstructor
@RestController
public class MilestoneController {

    private final MilestoneService milestoneService;

    @GetMapping
    public ResponseEntity<FilterOutlinesResponse> findMilestonesOutlineInfo() {
        List<FilterOutlineResponse> filterOutlineResponses = milestoneService.findMilestonesOutlineInfo();
        return ResponseEntity.ok(new FilterOutlinesResponse(filterOutlineResponses));
    }
}
