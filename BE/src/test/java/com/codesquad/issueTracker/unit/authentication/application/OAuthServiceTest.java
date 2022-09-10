package com.codesquad.issueTracker.unit.authentication.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.codesquad.issueTracker.authentication.application.OAuthService;
import com.codesquad.issueTracker.authentication.domain.repository.RedisTokenRepository;
import com.codesquad.issueTracker.authentication.infrastructure.JwtTokenProvider;
import com.codesquad.issueTracker.authentication.infrastructure.OAuthClientServer;
import com.codesquad.issueTracker.authentication.infrastructure.dto.OAuthTokenResponse;
import com.codesquad.issueTracker.authentication.infrastructure.dto.UserProfile;
import com.codesquad.issueTracker.authentication.presentation.dto.OAuthLoginResponse;
import com.codesquad.issueTracker.user.domain.User;
import com.codesquad.issueTracker.user.domain.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class OAuthServiceTest {

    @Mock
    private OAuthClientServer oAuthClientServer;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RedisTokenRepository redisTokenRepository;

    @InjectMocks
    private OAuthService oAuthService;

    @DisplayName("oAuthClientServer의 로그인 url를 전달받을 수 있다.")
    @Test
    void get_login_url() {
        // given
        given(oAuthClientServer.getLoginUrl())
            .willReturn("www.github.com");

        // when
        String url = oAuthService.getAuthorizationUrl();

        // then
        assertThat(url).isEqualTo("www.github.com");
    }

    @DisplayName("oAuthServer의 code를 전달하면 로그인 토큰을 반환받는다.")
    @Test
    void login_success() {
        // given
        String code = "oauthCode";
        String jwtAccessToken = "accessToken";
        String jwtRefreshToken = "refreshToken";
        OAuthTokenResponse accessToken = new OAuthTokenResponse(code, "Bearer", "scope");
        UserProfile userProfile = new UserProfile("name1", "nickname1", "image1");
        User user = new User(1L, "name1", "nickname1", "image1");

        given(oAuthClientServer.getOAuthToken(code))
            .willReturn(accessToken);
        given(oAuthClientServer.getUserProfile(accessToken))
            .willReturn(userProfile);
        given(userRepository.findByName(userProfile.getName()))
            .willReturn(Optional.of(user));
        given(jwtTokenProvider.generateAccessToken("1"))
            .willReturn(jwtAccessToken);
        given(jwtTokenProvider.generateRefreshToken("1"))
            .willReturn(jwtRefreshToken);

        // when
        OAuthLoginResponse loginResponse = oAuthService.login(code);

        // then
        assertThat(loginResponse.getAccessToken()).isEqualTo(jwtAccessToken);
        assertThat(loginResponse.getRefreshToken()).isEqualTo(jwtRefreshToken);
        assertThat(loginResponse.getTokenType()).isEqualTo("Bearer");
        assertThat(loginResponse.getUserProfileResponse().getName()).isEqualTo("name1");

        verify(oAuthClientServer, times(1))
            .getOAuthToken(code);
        verify(oAuthClientServer, times(1))
            .getUserProfile(accessToken);
        verify(userRepository, times(1))
            .findByName("name1");
        verify(jwtTokenProvider, times(1))
            .generateAccessToken("1");
        verify(redisTokenRepository, times(1))
            .insert("1", jwtRefreshToken);
    }

    @DisplayName("없는 유저일 경우 새로 저장 후 반환한다.")
    @Test
    void login_success_with_not_exist_user() {
        // given
        String code = "oauthCode";
        String jwtAccessToken = "accessToken";
        String jwtRefreshToken = "refreshToken";
        OAuthTokenResponse accessToken = new OAuthTokenResponse(code, "Bearer", "scope");
        UserProfile userProfile = new UserProfile("name1", "nickname1", "image1");
        User user = new User(1L, "name1", "nickname1", "image1");

        given(oAuthClientServer.getOAuthToken(code))
            .willReturn(accessToken);
        given(oAuthClientServer.getUserProfile(accessToken))
            .willReturn(userProfile);
        given(userRepository.findByName(userProfile.getName()))
            .willReturn(Optional.empty());
        given(userRepository.save(any(User.class)))
            .willReturn(user);
        given(jwtTokenProvider.generateAccessToken("1"))
            .willReturn(jwtAccessToken);
        given(jwtTokenProvider.generateRefreshToken("1"))
            .willReturn(jwtRefreshToken);

        // when
        OAuthLoginResponse loginResponse = oAuthService.login(code);

        // then
        assertThat(loginResponse.getAccessToken()).isEqualTo(jwtAccessToken);
        assertThat(loginResponse.getRefreshToken()).isEqualTo(jwtRefreshToken);
        assertThat(loginResponse.getTokenType()).isEqualTo("Bearer");
        assertThat(loginResponse.getUserProfileResponse().getName()).isEqualTo("name1");

        verify(oAuthClientServer, times(1))
            .getOAuthToken(code);
        verify(oAuthClientServer, times(1))
            .getUserProfile(accessToken);
        verify(userRepository, times(1))
            .findByName("name1");
        verify(userRepository, times(1))
            .save(any(User.class));
        verify(jwtTokenProvider, times(1))
            .generateAccessToken("1");
        verify(redisTokenRepository, times(1))
            .insert("1", jwtRefreshToken);
    }

    @DisplayName("로그아웃 요청 시 토큰이 삭제된다.")
    @Test
    void logout_request() {
        // when
        oAuthService.logout("name");

        // then
        verify(redisTokenRepository, times(1))
            .delete("name");
    }

    @DisplayName("더 이상 저장된 토큰이 없을 경우 true가 반환된다.")
    @Test
    void if_logout_return_true() {
        // given
        String userId = "1";
        given(redisTokenRepository.findByKey(userId))
            .willReturn(Optional.empty());

        // when
        boolean result = oAuthService.isLogout(userId);

        // then
        assertThat(result).isTrue();
    }

    @DisplayName("저장된 토큰이 있을 경우 false가 반환된다.")
    @Test
    void if_login_return_false() {
        // given
        String userId = "1";
        String value = "refreshToken";
        given(redisTokenRepository.findByKey(userId))
            .willReturn(Optional.of(value));

        // when
        boolean result = oAuthService.isLogout(userId);

        // then
        assertThat(result).isFalse();
    }
}
