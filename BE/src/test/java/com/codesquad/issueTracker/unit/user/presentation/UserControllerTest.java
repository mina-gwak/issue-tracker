package com.codesquad.issueTracker.unit.user.presentation;

import static com.codesquad.issueTracker.docs.RestDocsUtils.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import com.codesquad.issueTracker.unit.ControllerTest;
import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;

class UserControllerTest extends ControllerTest {

    @DisplayName("전체 user Outline 정보를 불러온다.")
    @Test
    void show_user_outline() throws Exception {
        // given
        UserOutlineResponse rsp1 = new UserOutlineResponse("user1", "image1");
        UserOutlineResponse rsp2 = new UserOutlineResponse("user2", "image2");
        UserOutlineResponse rsp3 = new UserOutlineResponse("user3", "image3");
        List<UserOutlineResponse> responseList = List.of(rsp1, rsp2, rsp3);

        PageRequest request = PageRequest.of(0, 3);
        given(userService.findUsers(request))
            .willReturn(responseList);

        // when
        ResultActions perform = mockMvc.perform(get("/api/users")
            .queryParam("page", "0")
            .queryParam("size", "3")
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.usersOutlineResponses.length()").value(3))
            .andExpect(jsonPath("$.usersOutlineResponses[1].optionName").value("user2"))
            .andExpect(jsonPath("$.usersOutlineResponses[1].imageUrl").value("image2"));

        perform.andDo(
            document("get-user-filter-info", getDocumentRequest(), getDocumentResponse(),
                requestParameters(
                    parameterWithName("page").description("원하는 페이지, 기본 0"),
                    parameterWithName("size").description("원하는 사이즈, 기본 10")
                ),
                responseFields(
                    fieldWithPath("usersOutlineResponses[].optionName").description("사용자 이름"),
                    fieldWithPath("usersOutlineResponses[].imageUrl").description("사용자 이미지")
                )));
    }

    @DisplayName("writer Outline 정보를 불러온다.")
    @Test
    void show_writer_outline() throws Exception {
        // given
        UserOutlineResponse rsp1 = new UserOutlineResponse("user1", "image1");
        UserOutlineResponse rsp2 = new UserOutlineResponse("user2", "image2");
        UserOutlineResponse rsp3 = new UserOutlineResponse("user3", "image3");
        List<UserOutlineResponse> responseList = List.of(rsp1, rsp2, rsp3);

        PageRequest request = PageRequest.of(0, 3);

        given(userService.findWriters(request))
            .willReturn(responseList);

        // when
        ResultActions perform = mockMvc.perform(get("/api/writers")
            .queryParam("page", "0")
            .queryParam("size", "3")
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.writersOutlineResponses.length()").value(3))
            .andExpect(jsonPath("$.writersOutlineResponses[1].optionName").value("user2"))
            .andExpect(jsonPath("$.writersOutlineResponses[1].imageUrl").value("image2"));

        perform.andDo(
            document("get-writer-filter-info", getDocumentRequest(), getDocumentResponse(),
                requestParameters(
                    parameterWithName("page").description("원하는 페이지, 기본 0"),
                    parameterWithName("size").description("원하는 사이즈, 기본 10")
                ),
                responseFields(
                    fieldWithPath("writersOutlineResponses[].optionName").description("작성자 이름"),
                    fieldWithPath("writersOutlineResponses[].imageUrl").description("작성자 이미지")
                )));
    }

    @DisplayName("assignee Outline 정보를 불러온다.")
    @Test
    void show_assignee_outline() throws Exception {
        // given
        UserOutlineResponse rsp1 = new UserOutlineResponse("user1", "image1");
        UserOutlineResponse rsp2 = new UserOutlineResponse("user2", "image2");
        UserOutlineResponse rsp3 = new UserOutlineResponse("user3", "image3");
        List<UserOutlineResponse> responseList = List.of(rsp1, rsp2, rsp3);

        PageRequest request = PageRequest.of(0, 3);

        given(userService.findAssignees(request))
            .willReturn(responseList);

        // when
        ResultActions perform = mockMvc.perform(get("/api/assignees")
            .queryParam("page", "0")
            .queryParam("size", "3")
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.assigneesOutlineResponses.length()").value(3))
            .andExpect(jsonPath("$.assigneesOutlineResponses[1].optionName").value("user2"))
            .andExpect(jsonPath("$.assigneesOutlineResponses[1].imageUrl").value("image2"));

        perform.andDo(
            document("get-assignees-filter-info", getDocumentRequest(), getDocumentResponse(),
                requestParameters(
                    parameterWithName("page").description("원하는 페이지, 기본 0"),
                    parameterWithName("size").description("원하는 사이즈, 기본 10")
                ),
                responseFields(
                    fieldWithPath("assigneesOutlineResponses[].optionName").description("할당자 이름"),
                    fieldWithPath("assigneesOutlineResponses[].imageUrl").description("할당자 이미지")
                )));
    }

    @DisplayName("로그아웃을 요청한다.")
    @Test
    void request_logout() throws Exception {
        // when
        ResultActions perform = mockMvc.perform(get("/api/users/logout")
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isNoContent());

        perform.andDo(
            document("request-logout"));
    }

}
