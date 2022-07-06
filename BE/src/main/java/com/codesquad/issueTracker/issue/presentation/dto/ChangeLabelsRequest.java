package com.codesquad.issueTracker.issue.presentation.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChangeLabelsRequest {
    private List<String> labels;

    public ChangeLabelsRequest(List<String> labels) {
        this.labels = labels;
    }
}
