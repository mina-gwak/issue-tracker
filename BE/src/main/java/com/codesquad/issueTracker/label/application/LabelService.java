package com.codesquad.issueTracker.label.application;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.label.application.dto.LabelListResponse;
import com.codesquad.issueTracker.label.application.dto.LabelOutlineResponse;
import com.codesquad.issueTracker.label.domain.Label;
import com.codesquad.issueTracker.label.domain.LabelRepository;
import com.codesquad.issueTracker.label.presentation.dto.LabelAddRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LabelService {

    private final LabelRepository labelRepository;

    @Transactional(readOnly = true)
    public List<LabelOutlineResponse> findLabelsOutlineInfo() {
        return labelRepository.findLabelsOutlineInfo();
    }

    @Transactional(readOnly = true)
    public LabelListResponse findLabelsList() {
        List<Label> labels = labelRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return new LabelListResponse(labels);
    }

    @Transactional
    public void addLabels(LabelAddRequest request) {
        Label label = request.toEntity();
        labelRepository.save(label);
    }

    @Transactional
    public void editLabels(Long labelId, LabelAddRequest request) {
        Label label = findSingleLabel(labelId);
        label.updateContents(request.getName(), request.getDescription(), request.getColorCode(),
            request.getTextColor());
    }

    @Transactional
    public void deleteLabels(Long labelId) {
        labelRepository.deleteById(labelId);
    }

    private Label findSingleLabel(Long labelId) {
        return labelRepository.findById(labelId)
            .orElseThrow(() -> new IllegalStateException("없는 label입니다."));
    }
}
