package com.codesquad.issueTracker.user.presentation;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.issueTracker.authentication.application.OAuthService;
import com.codesquad.issueTracker.user.application.UserService;
import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;
import com.codesquad.issueTracker.user.presentation.dto.AssigneesOutlineResponse;
import com.codesquad.issueTracker.user.presentation.dto.UserOutlinesResponse;
import com.codesquad.issueTracker.user.presentation.dto.WriterOutlinesResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class UserController {

    private final OAuthService oAuthService;
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<UserOutlinesResponse> findUsersOutlineInfo(@PageableDefault Pageable pageable) {
        List<UserOutlineResponse> userOutlineInfo = userService.findUsers(pageable);
        return ResponseEntity.ok(new UserOutlinesResponse(userOutlineInfo));
    }

    @GetMapping("/writers")
    public ResponseEntity<WriterOutlinesResponse> findWritersOutlineInfo(@PageableDefault Pageable pageable) {
        List<UserOutlineResponse> userOutlineInfo = userService.findWriters(pageable);
        return ResponseEntity.ok(new WriterOutlinesResponse(userOutlineInfo));
    }

    @GetMapping("/assignees")
    public ResponseEntity<AssigneesOutlineResponse> findAssigneesOutlineInfo(@PageableDefault Pageable pageable) {
        List<UserOutlineResponse> userOutlineInfo = userService.findAssignees(pageable);
        return ResponseEntity.ok(new AssigneesOutlineResponse(userOutlineInfo));
    }

    @GetMapping("/users/logout")
    public ResponseEntity<Void> oAuthLogout(@RequestAttribute String userId) {
        oAuthService.logout(userId);
        return ResponseEntity.noContent().build();
    }
}
