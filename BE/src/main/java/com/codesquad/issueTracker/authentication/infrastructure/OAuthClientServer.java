package com.codesquad.issueTracker.authentication.infrastructure;

import com.codesquad.issueTracker.authentication.infrastructure.dto.OAuthTokenResponse;
import com.codesquad.issueTracker.authentication.infrastructure.dto.UserProfileResponse;

public interface OAuthClientServer {

    String getLoginUrl();

    OAuthTokenResponse getOAuthToken(String code);

    UserProfileResponse getUserProfile(OAuthTokenResponse token);
}
