package com.codesquad.issueTracker.authentication.infrastructure;

import com.codesquad.issueTracker.authentication.infrastructure.dto.OAuthTokenResponse;
import com.codesquad.issueTracker.authentication.infrastructure.dto.UserProfile;

public interface OAuthClientServer {

    String getLoginUrl();

    OAuthTokenResponse getOAuthToken(String code);

    UserProfile getUserProfile(OAuthTokenResponse token);
}
