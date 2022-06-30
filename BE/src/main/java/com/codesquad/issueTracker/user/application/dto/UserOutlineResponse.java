package com.codesquad.issueTracker.user.application.dto;

import lombok.Getter;

@Getter
public class UserOutlineResponse {
    private String name;
    private String imageUrl;

    public UserOutlineResponse(String name, String imageUrl) {
        this.name = name;
        this.imageUrl = imageUrl;
    }
}
