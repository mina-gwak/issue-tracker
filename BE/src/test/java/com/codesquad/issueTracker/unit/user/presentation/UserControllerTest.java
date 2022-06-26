package com.codesquad.issueTracker.unit.user.presentation;

import static com.codesquad.issueTracker.docs.RestDocsUtils.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import com.codesquad.issueTracker.issue.application.dto.FilterOutlineResponse;
import com.codesquad.issueTracker.unit.ControllerTest;

class UserControllerTest extends ControllerTest {

    @DisplayName("유저 Outline 정보를 불러온다.")
    @Test
    void show_user_outline() throws Exception {
        // given
        FilterOutlineResponse rsp1 = new FilterOutlineResponse("user1", "image1");
        FilterOutlineResponse rsp2 = new FilterOutlineResponse("user2", "image2");
        FilterOutlineResponse rsp3 = new FilterOutlineResponse("user3", "image3");
        List<FilterOutlineResponse> responseList = List.of(rsp1, rsp2, rsp3);

        given(userService.findUserOutlineInfo())
            .willReturn(responseList);

        // when
        ResultActions perform = mockMvc.perform(get("/api/users")
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.filterOutlineResponses.length()").value(3))
            .andExpect(jsonPath("$.filterOutlineResponses[1].name").value("user2"))
            .andExpect(jsonPath("$.filterOutlineResponses[1].image").value("image2"));

        perform.andDo(
            document("get-user-filter-info", getDocumentRequest(), getDocumentResponse(),
                responseFields(
                    fieldWithPath("filterOutlineResponses[].name").description("사용자 이름"),
                    fieldWithPath("filterOutlineResponses[].image").description("사용자 이미지")
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
