package com.codesquad.issueTracker.unit.user.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;

import com.codesquad.issueTracker.issue.domain.repository.AssignedIssueRepository;
import com.codesquad.issueTracker.issue.domain.repository.IssueRepository;
import com.codesquad.issueTracker.user.application.UserService;
import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;
import com.codesquad.issueTracker.user.domain.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private IssueRepository issueRepository;

    @Mock
    private AssignedIssueRepository assignedIssueRepository;

    List<UserOutlineResponse> responses;

    @BeforeEach
    void setUp() {
        UserOutlineResponse response1 = new UserOutlineResponse("name1", "url1");
        UserOutlineResponse response2 = new UserOutlineResponse("name2", "url2");
        UserOutlineResponse response3 = new UserOutlineResponse("name3", "url3");

        responses = List.of(response1, response2, response3);
    }

    @DisplayName("page size 크기에 맞는 유저 목록을 조회한다.")
    @Test
    void find_users() {
        // given
        PageRequest request = PageRequest.ofSize(3);
        given(userRepository.findUserOutlineInfo(request))
            .willReturn(responses);

        // when
        List<UserOutlineResponse> userOutlineResponses = userService.findUsers(request);

        // then
        assertThat(userOutlineResponses.size()).isEqualTo(3);
        assertThat(userOutlineResponses.get(0).getOptionName()).isEqualTo("name1");
        assertThat(userOutlineResponses.get(0).getImageUrl()).isEqualTo("url1");
    }

    @DisplayName("page size 크기에 맞는 writers 목록을 조회한다.")
    @Test
    void find_writers() {
        // given
        PageRequest request = PageRequest.ofSize(3);
        List<Long> writersId = List.of(1L, 2L, 3L);
        given(issueRepository.findWriters(request))
            .willReturn(writersId);

        given(userRepository.findByIds(writersId))
            .willReturn(responses);

        // when
        List<UserOutlineResponse> userOutlineResponses = userService.findWriters(request);

        // then
        assertThat(userOutlineResponses.size()).isEqualTo(3);
        assertThat(userOutlineResponses.get(0).getOptionName()).isEqualTo("name1");
        assertThat(userOutlineResponses.get(0).getImageUrl()).isEqualTo("url1");
    }

    @DisplayName("page size 크기에 맞는 assignees 목록을 조회한다.")
    @Test
    void find_assignees() {
        // given
        PageRequest request = PageRequest.ofSize(3);
        List<Long> assigneesId = List.of(1L, 2L, 3L);
        given(assignedIssueRepository.findAssignees(request))
            .willReturn(assigneesId);

        given(userRepository.findByIds(assigneesId))
            .willReturn(responses);

        // when
        List<UserOutlineResponse> userOutlineResponses = userService.findAssignees(request);

        // then
        assertThat(userOutlineResponses.size()).isEqualTo(3);
        assertThat(userOutlineResponses.get(0).getOptionName()).isEqualTo("name1");
        assertThat(userOutlineResponses.get(0).getImageUrl()).isEqualTo("url1");
    }

}
