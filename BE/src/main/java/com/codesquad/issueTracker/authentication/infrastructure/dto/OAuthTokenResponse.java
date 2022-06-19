package com.codesquad.issueTracker.authentication.infrastructure.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class OAuthTokenResponse {

    private String accessToken;
    private String tokenType;
    private String scope;

    public String getAccessTokenHeader() {
        return this.tokenType + " " + this.accessToken;
    }

}
