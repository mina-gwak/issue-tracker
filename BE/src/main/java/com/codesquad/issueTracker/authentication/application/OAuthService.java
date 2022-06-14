package com.codesquad.issueTracker.authentication.application;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OAuthService {

    private final String clientId;
    private final String clientSecret;
    private final String githubTokenServerUri;
    private final String githubOAuthServerUri;
    private final String authorizationUrl;
    private final RestTemplate restTemplate;

    public OAuthService(
        @Value("${jwt.token.github.client-id}") String clientId,
        @Value("${jwt.token.github.client-secret}") String clientSecret,
        @Value("${jwt.token.github.token-server-uri}") String githubTokenServerUri,
        @Value("${jwt.token.github.oauth-server-uri}") String githubOAuthServerUri,
        @Value("${jwt.token.github.oauth-login-uri}") String authorizationUrl,
        RestTemplate restTemplate) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.githubTokenServerUri = githubTokenServerUri;
        this.githubOAuthServerUri = githubOAuthServerUri;
        this.authorizationUrl = authorizationUrl;
        this.restTemplate = restTemplate;
    }

    public String getAuthorizationUrl() {
        return authorizationUrl;
    }
}
