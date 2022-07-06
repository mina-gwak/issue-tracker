package com.codesquad.issueTracker.issue.presentation.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChangeAssigneesRequest {
    private List<String> assignees;

    public ChangeAssigneesRequest(List<String> assignees) {
        this.assignees = assignees;
    }
}
