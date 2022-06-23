package com.codesquad.issueTracker.authentication.presentation.dto;

import com.codesquad.issueTracker.authentication.application.dto.UserProfileResponse;
import com.codesquad.issueTracker.authentication.infrastructure.dto.UserProfile;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class OAuthLoginResponse {

    private String tokenType;
    private String accessToken;
    private String refreshToken;
    private UserProfileResponse userProfileResponse;
}
