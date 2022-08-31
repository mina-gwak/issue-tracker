package com.codesquad.issueTracker.issue.presentation.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChangeIssueContentsRequest {
    private String contents;

    public ChangeIssueContentsRequest(String contents) {
        this.contents = contents;
    }
}
