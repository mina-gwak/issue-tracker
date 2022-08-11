package com.codesquad.issueTracker.user.presentation.dto;

import java.util.List;

import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;

import lombok.Getter;

@Getter
public class AssigneesOutlineResponse {

    private List<UserOutlineResponse> assigneesOutlineResponses;

    public AssigneesOutlineResponse(
        List<UserOutlineResponse> assigneesOutlineResponses) {
        this.assigneesOutlineResponses = assigneesOutlineResponses;
    }
}
