package com.codesquad.issueTracker.authentication.presentation;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class OAuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @DisplayName("GitHub 로그인 요청 시 인증할 수 있는 GitHub URL을 제공한다.")
    @Test
    void provide_gitHub_url() throws Exception {
        mockMvc.perform(get("/api/authorization/github"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("url").value("https://github.com/login/oauth/authorize?client_id=e949184169a31864d4ba&scope=user"));
    }



}
