package com.codesquad.issueTracker.authentication.presentation;

import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.codesquad.issueTracker.authentication.application.OAuthService;
import com.codesquad.issueTracker.authentication.infrastructure.JwtTokenProvider;

@AutoConfigureRestDocs
@WebMvcTest(OAuthController.class)
class OAuthControllerTest {

    @MockBean
    private OAuthService oAuthService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {

    }

    @DisplayName("GitHub 로그인 요청 시 인증할 수 있는 GitHub URL을 제공한다.")
    @Test
    void provide_gitHub_url() throws Exception {
        // given
        given(oAuthService.getAuthorizationUrl())
            .willReturn("/testUrl");

        // when
        ResultActions perform = mockMvc.perform(get("/api/oauth/github"));

        // then
        perform
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.url").value("/testUrl"));

        perform.andDo(
            document("get-login-url",
                responseFields(
                    fieldWithPath("url").description("GitHub 로그인 서버 URL"))
            ));
    }
}
