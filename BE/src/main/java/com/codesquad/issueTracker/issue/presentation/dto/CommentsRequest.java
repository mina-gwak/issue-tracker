package com.codesquad.issueTracker.issue.presentation.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentsRequest {
    private String contents;

    public CommentsRequest(String contents) {
        this.contents = contents;
    }
}
