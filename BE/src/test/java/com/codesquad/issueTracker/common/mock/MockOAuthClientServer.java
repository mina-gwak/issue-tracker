package com.codesquad.issueTracker.common.mock;

import javax.validation.constraints.NotNull;

import com.codesquad.issueTracker.authentication.infrastructure.OAuthClientServer;
import com.codesquad.issueTracker.authentication.infrastructure.dto.OAuthTokenResponse;
import com.codesquad.issueTracker.authentication.infrastructure.dto.UserProfile;

public class MockOAuthClientServer implements OAuthClientServer {
    @Override
    public String getLoginUrl() {
        return "https://github.com/login/oauth/authorize?client_id=xx";
    }

    @Override
    public OAuthTokenResponse getOAuthToken(@NotNull String code) {
        return new OAuthTokenResponse("testAccessToken", "Bearer", "profile");
    }

    @Override
    public UserProfile getUserProfile(OAuthTokenResponse token) {
        return new UserProfile("testName", "testNickName", "testImage");
    }
}
