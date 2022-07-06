package com.codesquad.issueTracker.user.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.issue.domain.repository.AssignedIssueRepository;
import com.codesquad.issueTracker.issue.domain.repository.IssueRepository;
import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;
import com.codesquad.issueTracker.user.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final IssueRepository issueRepository;
    private final AssignedIssueRepository assignedIssueRepository;

    @Transactional(readOnly = true)
    public List<UserOutlineResponse> findUsers() {
        return userRepository.findUserOutlineInfo();
    }

    @Transactional(readOnly = true)
    public List<UserOutlineResponse> findWriters() {
        List<Long> writersId = issueRepository.findWriters();
        return userRepository.findByIds(writersId);
    }

    @Transactional(readOnly = true)
    public List<UserOutlineResponse> findAssignees() {
        List<Long> assigneesId = assignedIssueRepository.findAssignees();
        return userRepository.findByIds(assigneesId);
    }
}
