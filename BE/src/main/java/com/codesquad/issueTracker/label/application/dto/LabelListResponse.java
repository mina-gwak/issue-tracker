package com.codesquad.issueTracker.label.application.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.codesquad.issueTracker.label.domain.Label;

import lombok.Getter;

@Getter
public class LabelListResponse {
    private long labelCount;
    private List<LabelDetails> labelDetails;

    public LabelListResponse(List<Label> labels) {
        this.labelCount = labels.size();
        this.labelDetails = labels.stream()
            .map(LabelDetails::new)
            .collect(Collectors.toList());
    }
}
