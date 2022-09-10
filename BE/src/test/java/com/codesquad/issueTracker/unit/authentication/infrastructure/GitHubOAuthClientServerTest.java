package com.codesquad.issueTracker.unit.authentication.infrastructure;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.codesquad.issueTracker.authentication.infrastructure.GitHubOAuthClientServer;
import com.codesquad.issueTracker.authentication.infrastructure.dto.OAuthTokenResponse;
import com.codesquad.issueTracker.authentication.infrastructure.dto.UserProfile;
import com.codesquad.issueTracker.exception.common.InternalServerException;

@ExtendWith(MockitoExtension.class)
public class GitHubOAuthClientServerTest {

    private GitHubOAuthClientServer clientServer;
    private String CLIENT_ID = "client_id";
    private String SECRET = "client_secret";
    private String TOKEN_SERVER = "token_server";
    private String OAUTH_SERVER = "oauth_server";
    private String OAUTH_URL = "authorize_url";

    @Mock
    private RestTemplate restTemplate;

    @BeforeEach
    void init() {
        clientServer = new GitHubOAuthClientServer(
            CLIENT_ID, SECRET, TOKEN_SERVER,
            OAUTH_SERVER, OAUTH_URL, restTemplate);
    }

    @DisplayName("login할 수 있는 경로를 가져온다.")
    @Test
    void get_login_url() {
        assertThat(clientServer.getLoginUrl()).isEqualTo(OAUTH_URL);
    }

    @DisplayName("token server로부터 authorize Token을 가져올 수 있다.")
    @Test
    void get_authorize_token() {
        // given
        given(restTemplate.exchange(eq(TOKEN_SERVER), eq(HttpMethod.POST), any(HttpEntity.class),
            eq(OAuthTokenResponse.class)))
            .willReturn(ResponseEntity.ok(new OAuthTokenResponse("accessToken", "Bearer", "USER")));

        // when
        OAuthTokenResponse response = clientServer.getOAuthToken("code");

        // then
        assertThat(response.getAccessToken()).isEqualTo("accessToken");
        assertThat(response.getTokenType()).isEqualTo("Bearer");
        assertThat(response.getScope()).isEqualTo("USER");
    }

    @DisplayName("token이 정상적으로 반환되지 않았을 경우 InternalServerException이 발생한다.")
    @Test
    void abnormal_token_occur_exception() {
        // given
        given(restTemplate.exchange(eq(TOKEN_SERVER), eq(HttpMethod.POST), any(HttpEntity.class),
            eq(OAuthTokenResponse.class)))
            .willReturn(ResponseEntity.ok(null));

        // when & then
        assertThatThrownBy(() -> clientServer.getOAuthToken("code"))
            .isInstanceOf(InternalServerException.class);
    }

    @DisplayName("token을 전달해서 userProfile을 가져올 수 있다.")
    @Test
    void get_user_profile() {
        // given
        given(restTemplate.exchange(eq(OAUTH_SERVER), eq(HttpMethod.GET), any(HttpEntity.class),
            eq(UserProfile.class)))
            .willReturn(ResponseEntity.ok(new UserProfile("name", "nickName", "img")));

        OAuthTokenResponse tokenResponse = new OAuthTokenResponse("accessToken", "Bearer", "USER");
        // when
        UserProfile userProfile = clientServer.getUserProfile(tokenResponse);

        // then
        assertThat(userProfile.getName()).isEqualTo("name");
        assertThat(userProfile.getNickname()).isEqualTo("nickName");
        assertThat(userProfile.getImage()).isEqualTo("img");
    }

    @DisplayName("profile이 정상적으로 반환되지 않았을 경우 InternalServerException이 발생한다.")
    @Test
    void abnormal_profile_occur_exception() {
        // given
        given(restTemplate.exchange(eq(OAUTH_SERVER), eq(HttpMethod.GET), any(HttpEntity.class),
            eq(UserProfile.class)))
            .willReturn(ResponseEntity.ok(null));

        OAuthTokenResponse tokenResponse = new OAuthTokenResponse("accessToken", "Bearer", "USER");

        // when & then
        assertThatThrownBy(() -> clientServer.getUserProfile(tokenResponse))
            .isInstanceOf(InternalServerException.class);
    }

}
