package com.codesquad.issueTracker.label.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.issue.application.dto.FilterOutlineResponse;
import com.codesquad.issueTracker.issue.application.dto.FilterOutlinesResponse;
import com.codesquad.issueTracker.label.application.LabelService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/labels")
@RestController
public class LabelController {

    private final LabelService labelService;

    @GetMapping
    public ResponseEntity<FilterOutlinesResponse> findLabelsOutlineInfo() {
        List<FilterOutlineResponse> filterOutlineResponses = labelService.findLabelsOutlineInfo();
        return ResponseEntity.ok(new FilterOutlinesResponse(filterOutlineResponses));
    }
}
