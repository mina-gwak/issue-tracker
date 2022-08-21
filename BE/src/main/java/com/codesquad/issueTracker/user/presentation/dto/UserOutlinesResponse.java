package com.codesquad.issueTracker.user.presentation.dto;

import java.util.List;

import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserOutlinesResponse {

    private List<UserOutlineResponse> usersOutlineResponses;

    public UserOutlinesResponse(
        List<UserOutlineResponse> usersOutlineResponses) {
        this.usersOutlineResponses = usersOutlineResponses;
    }
}
