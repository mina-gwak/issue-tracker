package com.codesquad.issueTracker.user.presentation.dto;

import java.util.List;

import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;

import lombok.Getter;

@Getter
public class UserOutlinesResponse {

    private List<UserOutlineResponse> usersOutlineResponses;

    public UserOutlinesResponse(
        List<UserOutlineResponse> usersOutlineResponses) {
        this.usersOutlineResponses = usersOutlineResponses;
    }
}
