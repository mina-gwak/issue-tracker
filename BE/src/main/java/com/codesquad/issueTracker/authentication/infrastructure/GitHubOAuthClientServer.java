package com.codesquad.issueTracker.authentication.infrastructure;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.codesquad.issueTracker.authentication.infrastructure.dto.OAuthTokenRequest;
import com.codesquad.issueTracker.authentication.infrastructure.dto.OAuthTokenResponse;
import com.codesquad.issueTracker.authentication.infrastructure.dto.UserProfile;

@Component
public class GitHubOAuthClientServer implements OAuthClientServer {

    private final String clientId;
    private final String clientSecret;
    private final String githubTokenServerUri;
    private final String githubOAuthServerUri;
    private final String authorizationUrl;
    private final RestTemplate restTemplate;

    public GitHubOAuthClientServer(
        @Value("${oauth.github.client-id}") String clientId,
        @Value("${oauth.github.client-secret}") String clientSecret,
        @Value("${oauth.github.token-server-uri}") String githubTokenServerUri,
        @Value("${oauth.github.oauth-server-uri}") String githubOAuthServerUri,
        @Value("${oauth.github.oauth-login-uri}") String authorizationUrl,
        RestTemplate restTemplate) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.githubTokenServerUri = githubTokenServerUri;
        this.githubOAuthServerUri = githubOAuthServerUri;
        this.authorizationUrl = authorizationUrl;
        this.restTemplate = restTemplate;
    }

    @Override
    public String getLoginUrl() {
        return authorizationUrl;
    }

    @Override
    public OAuthTokenResponse getOAuthToken(String code) {
        OAuthTokenRequest accessTokenRequest = new OAuthTokenRequest(clientId, clientSecret, code);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Accept", MediaType.APPLICATION_JSON_VALUE);

        HttpEntity<OAuthTokenRequest> httpEntity = new HttpEntity<>(accessTokenRequest, headers);
        OAuthTokenResponse response = restTemplate
            .exchange(githubTokenServerUri, HttpMethod.POST, httpEntity, OAuthTokenResponse.class)
            .getBody();

        if (Objects.isNull(response)) {
            throw new IllegalStateException("GitHub Server로부터 토큰을 받지 못했습니다.");
        }
        return response;
    }

    @Override
    public UserProfile getUserProfile(OAuthTokenResponse token) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.add("Authorization", token.getAccessTokenHeader());

        HttpEntity<Void> httpEntity = new HttpEntity<>(headers);
        UserProfile response = restTemplate
            .exchange(githubOAuthServerUri, HttpMethod.GET, httpEntity, UserProfile.class)
            .getBody();

        if (Objects.isNull(response)) {
            throw new IllegalStateException("GitHub로부터 User 데이터를 받지 못했습니다.");
        }
        return response;
    }
}
