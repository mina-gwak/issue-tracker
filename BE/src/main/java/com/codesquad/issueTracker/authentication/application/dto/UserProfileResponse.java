package com.codesquad.issueTracker.authentication.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse {

    private String name;
    private String nickname;
    private String image;
}
