package com.codesquad.issueTracker.milestone.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.milestone.application.MilestoneService;
import com.codesquad.issueTracker.milestone.application.dto.MilestoneOutlineResponse;
import com.codesquad.issueTracker.milestone.application.dto.MilestoneSingleInfoResponse;
import com.codesquad.issueTracker.milestone.application.dto.MilestonesResponse;
import com.codesquad.issueTracker.milestone.presentation.dto.MilestoneOutlinesResponse;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/milestones")
@RequiredArgsConstructor
@RestController
public class MilestoneController {

    private final MilestoneService milestoneService;

    @GetMapping
    public ResponseEntity<MilestoneOutlinesResponse> findMilestonesOutlineInfo() {
        List<MilestoneOutlineResponse> milestonesOutlineInfo = milestoneService.findMilestonesOutlineInfo();
        return ResponseEntity.ok(new MilestoneOutlinesResponse(milestonesOutlineInfo));
    }

    @GetMapping("/list")
    public ResponseEntity<MilestonesResponse> findMilestones(@RequestParam String open) {
        return ResponseEntity.ok(milestoneService.findMilestones(open));
    }
}
