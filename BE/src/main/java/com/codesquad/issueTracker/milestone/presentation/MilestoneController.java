package com.codesquad.issueTracker.milestone.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.milestone.application.MilestoneService;
import com.codesquad.issueTracker.milestone.application.dto.MilestoneOutlineResponse;
import com.codesquad.issueTracker.milestone.application.dto.MilestonesResponse;
import com.codesquad.issueTracker.milestone.presentation.dto.MilestoneContentRequest;
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

    @PostMapping
    public ResponseEntity<Void> createMilestone(@RequestBody MilestoneContentRequest request) {
        milestoneService.createMilestone(request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{milestoneId}")
    public ResponseEntity<Void> editMilestone(@PathVariable Long milestoneId, @RequestBody MilestoneContentRequest request) {
        milestoneService.editMilestone(milestoneId, request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{milestoneId}/change")
    public ResponseEntity<Void> changeStatus(@PathVariable Long milestoneId, @RequestParam String open) {
        milestoneService.changeStatus(milestoneId, open);
        return ResponseEntity.ok().build();
    }

}
