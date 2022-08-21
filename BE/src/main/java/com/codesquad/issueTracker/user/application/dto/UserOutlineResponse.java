package com.codesquad.issueTracker.user.application.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserOutlineResponse {
    private String optionName;
    private String imageUrl;

    public UserOutlineResponse(String optionName, String imageUrl) {
        this.optionName = optionName;
        this.imageUrl = imageUrl;
    }
}
