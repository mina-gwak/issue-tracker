package com.codesquad.issueTracker.authentication.application;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.user.domain.User;
import com.codesquad.issueTracker.user.domain.repository.UserRepository;
import com.codesquad.issueTracker.authentication.domain.repository.RedisTokenRepository;
import com.codesquad.issueTracker.authentication.infrastructure.JwtTokenProvider;
import com.codesquad.issueTracker.authentication.infrastructure.OAuthClientServer;
import com.codesquad.issueTracker.authentication.infrastructure.dto.OAuthTokenResponse;
import com.codesquad.issueTracker.authentication.infrastructure.dto.UserProfile;
import com.codesquad.issueTracker.authentication.presentation.dto.OAuthLoginResponse;

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
    public OAuthLoginResponse login(String code) {
        OAuthTokenResponse accessToken = oAuthClientServer.getOAuthToken(code);
        UserProfile userProfile = oAuthClientServer.getUserProfile(accessToken);

        User user = saveUser(userProfile);
        String savedUserId = String.valueOf(user.getId());

        String jwtAccessToken = jwtTokenProvider.generateAccessToken(savedUserId);
        String jwtRefreshToken = jwtTokenProvider.generateRefreshToken(savedUserId);
        log.debug("jwtAccessToken : {}, refreshToken : {}", jwtAccessToken, jwtRefreshToken);

        // TODO : RollBack 적용 필요
        redisTokenRepository.insert(savedUserId, jwtRefreshToken);
        return new OAuthLoginResponse("Bearer", jwtAccessToken, jwtRefreshToken, userProfile.toDto());
    }

    public void logout(String username) {
        redisTokenRepository.delete(username);
    }

    private User saveUser(UserProfile userProfile) {
        Optional<User> user = userRepository.findByName(userProfile.getName());
        return user.orElseGet(() -> userRepository.save(userProfile.toEntity()));
    }

    public boolean isLogout(String userId) {
        return redisTokenRepository.findByKey(userId).isEmpty();
    }
}
