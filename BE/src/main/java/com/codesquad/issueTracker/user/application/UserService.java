package com.codesquad.issueTracker.user.application;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;
import com.codesquad.issueTracker.user.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<UserOutlineResponse> findUserOutlineInfo() {
        return userRepository.findUserOutlineInfo();
    }

    public List<UserOutlineResponse> findAssignees() {
        List<String> assigneeList = List.of("honux", "crong", "jk", "ivy");
        return userRepository.findByNameIn(assigneeList).stream()
            .map(user -> new UserOutlineResponse(user.getName(), user.getImage()))
            .collect(Collectors.toList());
    }

}
