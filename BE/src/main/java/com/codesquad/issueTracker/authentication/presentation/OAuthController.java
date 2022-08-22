package com.codesquad.issueTracker.authentication.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.authentication.application.OAuthService;
import com.codesquad.issueTracker.authentication.application.dto.UserProfileResponse;
import com.codesquad.issueTracker.authentication.infrastructure.JwtTokenProvider;
import com.codesquad.issueTracker.authentication.infrastructure.dto.UserProfile;
import com.codesquad.issueTracker.authentication.presentation.dto.OAuthLoginResponse;
import com.codesquad.issueTracker.authentication.presentation.dto.OAuthorizationLoginUrlResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
@RestController
public class OAuthController {

    private final OAuthService oAuthService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/github")
    public ResponseEntity<OAuthorizationLoginUrlResponse> githubAuthorizationUrl() {
        return ResponseEntity.ok(new OAuthorizationLoginUrlResponse(oAuthService.getAuthorizationUrl()));
    }

    @GetMapping("/login/github/callback")
    public ResponseEntity<OAuthLoginResponse> oAuthLogin(@RequestParam String code) {
        OAuthLoginResponse loginToken = oAuthService.login(code);
        return ResponseEntity.ok(loginToken);
    }

    @GetMapping("/testToken")
    public ResponseEntity<OAuthLoginResponse> getTestToken() {
        String accessToken = jwtTokenProvider.generateAccessToken(String.valueOf(1));
        String refreshToken = jwtTokenProvider.generateRefreshToken(String.valueOf(1));
        return ResponseEntity.ok(new OAuthLoginResponse("Bearer", accessToken, refreshToken, new UserProfileResponse("guest", "guestMode", "http://zipbanchan.godohosting.com/detail_page/3_main/1351/1351_ZIP_P_0108_S.jpg")));
    }
}
