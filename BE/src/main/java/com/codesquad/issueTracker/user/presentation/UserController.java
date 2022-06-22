package com.codesquad.issueTracker.user.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.authentication.application.OAuthService;
import com.codesquad.issueTracker.issue.application.dto.FilterOutlineResponse;
import com.codesquad.issueTracker.issue.application.dto.FilterOutlinesResponse;
import com.codesquad.issueTracker.user.application.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/users")
@RestController
public class UserController {

    private final OAuthService oAuthService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<FilterOutlinesResponse> findUsersOutlineInfo() {
        List<FilterOutlineResponse> filterOutlineResponses = userService.findUserOutlineInfo();
        return ResponseEntity.ok(new FilterOutlinesResponse(filterOutlineResponses));
    }

    @GetMapping("/logout")
    public ResponseEntity<String> oAuthLogout(@RequestAttribute String username) {
        oAuthService.logout(username);
        return ResponseEntity.ok("logout success : " + username);
    }
}
