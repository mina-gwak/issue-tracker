package com.codesquad.issueTracker.unit.authentication.presentation;

import static com.codesquad.issueTracker.docs.RestDocsUtils.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.ResultActions;

import com.codesquad.issueTracker.authentication.application.dto.UserProfileResponse;
import com.codesquad.issueTracker.authentication.presentation.dto.OAuthLoginResponse;
import com.codesquad.issueTracker.unit.ControllerTest;

class OAuthControllerTest extends ControllerTest {

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
            document("get-login-url", getDocumentRequest(), getDocumentResponse(),
                responseFields(
                    fieldWithPath("url").description("GitHub 로그인 서버 URL"))
            ));
    }

    @DisplayName("유효한 code를 전달하면 로그인 token을 얻을 수 있다.")
    @Test
    void get_login_token() throws Exception {
        // given
        OAuthLoginResponse loginToken = new OAuthLoginResponse("Bearer", "xxyyzz", "aabbcc",
            new UserProfileResponse("leejohy", "lucid", "image"));

        given(oAuthService.login("authCode"))
            .willReturn(loginToken);

        // when
        ResultActions perform = mockMvc.perform(get("/api/oauth/login/github/callback")
            .queryParam("code", "authCode")
        );

        // then
        perform
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tokenType").value("Bearer"))
            .andExpect(jsonPath("$.accessToken").value("xxyyzz"))
            .andExpect(jsonPath("$.refreshToken").value("aabbcc"))
            .andExpect(jsonPath("$.userProfileResponse.name").value("leejohy"))
            .andExpect(jsonPath("$.userProfileResponse.nickname").value("lucid"))
            .andExpect(jsonPath("$.userProfileResponse.image").value("image"));

        perform.andDo(
            document("get-login-token", getDocumentRequest(), getDocumentResponse(),
                requestParameters(parameterWithName("code").description("GitHub auth code 발급")),
                responseFields(
                    fieldWithPath("tokenType").description("토큰 타입"),
                    fieldWithPath("accessToken").description("엑세스 토큰"),
                    fieldWithPath("refreshToken").description("refresh 토큰"),
                    fieldWithPath("userProfileResponse.name").description("유저 이름"),
                    fieldWithPath("userProfileResponse.nickname").description("유저 닉네임"),
                    fieldWithPath("userProfileResponse.image").description("유저 이미지"))
            ));
    }
}
