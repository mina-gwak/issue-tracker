package com.codesquad.issueTracker.user.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.authentication.application.OAuthService;
import com.codesquad.issueTracker.user.application.UserService;
import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;
import com.codesquad.issueTracker.user.presentation.dto.UserOutlinesResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/users")
@RestController
public class UserController {

    private final OAuthService oAuthService;
    private final UserService userService;

    @GetMapping("/writers")
    public ResponseEntity<UserOutlinesResponse> findWritersOutlineInfo() {
        List<UserOutlineResponse> userOutlineInfo = userService.findUserOutlineInfo();
        return ResponseEntity.ok(new UserOutlinesResponse(userOutlineInfo));
    }

    @GetMapping("/assignees")
    public ResponseEntity<UserOutlinesResponse> findAssigneesOutlineInfo() {
        List<UserOutlineResponse> userOutlineInfo = userService.findAssignees();
        return ResponseEntity.ok(new UserOutlinesResponse(userOutlineInfo));
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> oAuthLogout(@RequestAttribute String userId) {
        oAuthService.logout(userId);
        return ResponseEntity.noContent().build();
    }
}
