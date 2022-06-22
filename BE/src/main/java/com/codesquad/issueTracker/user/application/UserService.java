package com.codesquad.issueTracker.user.application;

import java.util.List;

import org.springframework.stereotype.Service;

import com.codesquad.issueTracker.issue.application.dto.FilterOutlineResponse;
import com.codesquad.issueTracker.user.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public List<FilterOutlineResponse> findUserOutlineInfo() {
        return userRepository.findUserOutlineInfo();
    }
}
