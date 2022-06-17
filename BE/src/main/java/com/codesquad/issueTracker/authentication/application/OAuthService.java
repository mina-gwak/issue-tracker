package com.codesquad.issueTracker.authentication.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.User.domain.UserRepository;
import com.codesquad.issueTracker.authentication.domain.RedisTokenRepository;
import com.codesquad.issueTracker.authentication.infrastructure.JwtTokenProvider;
import com.codesquad.issueTracker.authentication.infrastructure.OAuthClientServer;
import com.codesquad.issueTracker.authentication.infrastructure.dto.OAuthTokenResponse;
import com.codesquad.issueTracker.authentication.infrastructure.dto.UserProfileResponse;
import com.codesquad.issueTracker.authentication.presentation.dto.OAuthLoginTokenResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class OAuthService {

    private final OAuthClientServer oAuthClientServer;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final RedisTokenRepository redisTokenRepository;

    public String getAuthorizationUrl() {
        return oAuthClientServer.getLoginUrl();
    }

    @Transactional
    public OAuthLoginTokenResponse login(String code) {
        OAuthTokenResponse accessToken = oAuthClientServer.getOAuthToken(code);
        UserProfileResponse userProfile = oAuthClientServer.getUserProfile(accessToken);

        saveUser(userProfile);

        String jwtAccessToken = jwtTokenProvider.generateAccessToken(userProfile.getName());
        String jwtRefreshToken = jwtTokenProvider.generateRefreshToken(userProfile.getName());

        log.debug("jwtAccessToken : {}, refreshToken : {}", jwtAccessToken, jwtRefreshToken);

        // TODO : RollBack 적용 필요
        redisTokenRepository.insert(userProfile.getName(), jwtRefreshToken);

        return new OAuthLoginTokenResponse("Bearer", jwtAccessToken, jwtRefreshToken);
    }

    public void logout(String username) {
        redisTokenRepository.delete(username);
    }

    private void saveUser(UserProfileResponse userProfile) {
        if (userRepository.findByName(userProfile.getName()).isPresent()) {
            return;
        }
        userRepository.save(userProfile.toEntity());
    }

    public boolean isLogout(String username) {
        return redisTokenRepository.findByKey(username).isEmpty();
    }
}
