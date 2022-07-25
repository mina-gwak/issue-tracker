package com.codesquad.issueTracker.integration;

import static io.restassured.RestAssured.*;
import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;

import com.codesquad.issueTracker.authentication.presentation.dto.OAuthLoginResponse;
import com.codesquad.issueTracker.authentication.presentation.dto.OAuthorizationLoginUrlResponse;
import com.codesquad.issueTracker.config.TestBeanConfiguration;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;

@Import(TestBeanConfiguration.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AuthenticationTest {

    @LocalServerPort
    int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @DisplayName("모든 유저는 깃허브 로그인 url을 요청할 수 있다.")
    @Test
    void add_post() {
        // when
        ExtractableResponse<Response> response = given().log().all()
            .when().get("/api/oauth/github")
            .then().extract();

        OAuthorizationLoginUrlResponse result = response.as(OAuthorizationLoginUrlResponse.class);
        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(result.getUrl()).contains(
            "https://github.com/login/oauth/authorize?client_id=");
    }

    @DisplayName("모든 유저는 Github 로그인 후 loginToken을 돌려받는다.")
    @Test
    void return_login_token() {
        // when
        ExtractableResponse<Response> response = given().log().all()
            .param("code", "github_code")
            .accept(MediaType.APPLICATION_JSON_VALUE)
            .when().get("/api/oauth/login/github/callback")
            .then().extract();

        // then
        OAuthLoginResponse result = response.as(OAuthLoginResponse.class);
        assertThat(result.getAccessToken()).isNotBlank();
        assertThat(result.getRefreshToken()).isNotBlank();
        assertThat(result.getTokenType()).isEqualTo("Bearer");
        assertThat(result.getUserProfileResponse().getName()).isEqualTo("testName");

    }
}
