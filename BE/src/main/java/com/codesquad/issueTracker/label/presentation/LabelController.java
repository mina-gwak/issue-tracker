package com.codesquad.issueTracker.label.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.label.application.LabelService;
import com.codesquad.issueTracker.label.application.dto.LabelListResponse;
import com.codesquad.issueTracker.label.application.dto.LabelOutlineResponse;
import com.codesquad.issueTracker.label.presentation.dto.LabelAddRequest;
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

    // TODO : docs 추가
    @GetMapping("/list")
    public ResponseEntity<LabelListResponse> findLabelsList() {
        return ResponseEntity.ok(labelService.findLabelsList());
    }

    @PostMapping
    public ResponseEntity<Void> addLabels(@RequestBody LabelAddRequest request) {
        labelService.addLabels(request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{labelId}")
    public ResponseEntity<Void> editLabels(@PathVariable Long labelId, @RequestBody LabelAddRequest request) {
        labelService.editLabels(labelId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{labelId}")
    public ResponseEntity<Void> deleteLabels(@PathVariable Long labelId) {
        labelService.deleteLabels(labelId);
        return ResponseEntity.ok().build();
    }
}
