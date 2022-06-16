package com.codesquad.issueTracker.authentication.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.authentication.application.OAuthService;
import com.codesquad.issueTracker.authentication.presentation.dto.OAuthLoginTokenResponse;
import com.codesquad.issueTracker.authentication.presentation.dto.OAuthorizationLoginUrlResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
@RestController
public class OAuthController {

    private final OAuthService oAuthService;

    @GetMapping("/github")
    public ResponseEntity<OAuthorizationLoginUrlResponse> githubAuthorizationUrl() {
        return ResponseEntity.ok(new OAuthorizationLoginUrlResponse(oAuthService.getAuthorizationUrl()));
    }

    @GetMapping("/login/github/callback")
    public ResponseEntity<OAuthLoginTokenResponse> oAuthLogin(@RequestParam String code) {
        OAuthLoginTokenResponse loginToken = oAuthService.login(code);
        return ResponseEntity.ok(loginToken);
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> oAuthLogout(@RequestAttribute String username) {
        oAuthService.logout(username);
        return ResponseEntity.ok().build();
    }
}
