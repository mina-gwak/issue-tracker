package com.codesquad.issueTracker.User.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.authentication.application.OAuthService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/user")
@RestController
public class UserController {

    private final OAuthService oAuthService;

    @GetMapping
    public ResponseEntity<String> loginCheck(@RequestAttribute String username) {
        return ResponseEntity.ok("login success : " + username);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> oAuthLogout(@RequestAttribute String username) {
        oAuthService.logout(username);
        return ResponseEntity.ok("logout success : " + username);
    }
}
