package com.codesquad.issueTracker.label.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.label.application.dto.LabelOutlineResponse;
import com.codesquad.issueTracker.label.domain.LabelRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LabelService {

    private final LabelRepository labelRepository;

    @Transactional(readOnly = true)
    public List<LabelOutlineResponse> findLabelsOutlineInfo() {
        return labelRepository.findLabelsOutlineInfo();
    }
}
