package com.codesquad.issueTracker.authentication.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.authentication.application.OAuthService;
import com.codesquad.issueTracker.authentication.presentation.dto.OAuthorizationLoginUrlResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class OAuthController {

    private final OAuthService oAuthService;

    @GetMapping("/authorization/github")
    public ResponseEntity<OAuthorizationLoginUrlResponse> githubAuthorizationUrl() {
        return ResponseEntity
            .ok(new OAuthorizationLoginUrlResponse(oAuthService.getAuthorizationUrl()));
    }



}
