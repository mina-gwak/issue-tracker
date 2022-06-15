package com.codesquad.issueTracker.authentication.presentation.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class OAuthLoginTokenResponse {

    private String tokenType;
    private String accessToken;
    private String refreshToken;
}
