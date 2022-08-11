package com.codesquad.issueTracker.user.presentation.dto;

import java.util.List;

import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;

import lombok.Getter;

@Getter
public class WriterOutlinesResponse {

    private List<UserOutlineResponse> writersOutlineResponses;

    public WriterOutlinesResponse(
        List<UserOutlineResponse> writersOutlineResponses) {
        this.writersOutlineResponses = writersOutlineResponses;
    }
}
