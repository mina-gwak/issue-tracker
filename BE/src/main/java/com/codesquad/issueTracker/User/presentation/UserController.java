package com.codesquad.issueTracker.User.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/user")
@RestController
public class UserController {

    @GetMapping
    public ResponseEntity<String> loginCheck(@RequestAttribute String username) {
        return ResponseEntity.ok("login success! : " + username);
    }
}
