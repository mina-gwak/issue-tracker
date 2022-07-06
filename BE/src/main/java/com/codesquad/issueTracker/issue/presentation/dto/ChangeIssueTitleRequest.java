package com.codesquad.issueTracker.issue.presentation.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChangeIssueTitleRequest {
    private String title;

    public ChangeIssueTitleRequest(String title) {
        this.title = title;
    }
}
