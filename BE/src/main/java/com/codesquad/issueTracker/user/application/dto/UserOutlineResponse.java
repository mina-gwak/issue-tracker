package com.codesquad.issueTracker.user.application.dto;

import lombok.Getter;

@Getter
public class UserOutlineResponse {
    private String optionName;
    private String imageUrl;

    public UserOutlineResponse(String optionName, String imageUrl) {
        this.optionName = optionName;
        this.imageUrl = imageUrl;
    }
}
