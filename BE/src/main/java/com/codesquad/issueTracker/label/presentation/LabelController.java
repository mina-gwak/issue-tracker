package com.codesquad.issueTracker.label.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.label.application.LabelService;
import com.codesquad.issueTracker.label.application.dto.LabelOutlineResponse;
import com.codesquad.issueTracker.label.presentation.dto.LabelOutlinesResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/labels")
@RestController
public class LabelController {

    private final LabelService labelService;

    @GetMapping
    public ResponseEntity<LabelOutlinesResponse> findLabelsOutlineInfo() {
        List<LabelOutlineResponse> labelsOutlineInfo = labelService.findLabelsOutlineInfo();
        return ResponseEntity.ok(new LabelOutlinesResponse(labelsOutlineInfo));
    }
}
