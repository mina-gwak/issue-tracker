package com.codesquad.issueTracker.unit;

import static org.mockito.BDDMockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.codesquad.issueTracker.authentication.application.OAuthService;
import com.codesquad.issueTracker.authentication.infrastructure.JwtTokenProvider;
import com.codesquad.issueTracker.authentication.presentation.OAuthController;
import com.codesquad.issueTracker.common.application.S3Uploader;
import com.codesquad.issueTracker.common.presentation.S3Controller;
import com.codesquad.issueTracker.issue.application.IssueService;
import com.codesquad.issueTracker.issue.presentation.IssueController;
import com.codesquad.issueTracker.label.application.LabelService;
import com.codesquad.issueTracker.label.presentation.LabelController;
import com.codesquad.issueTracker.milestone.application.MilestoneService;
import com.codesquad.issueTracker.milestone.presentation.MilestoneController;
import com.codesquad.issueTracker.user.application.UserService;
import com.codesquad.issueTracker.user.presentation.UserController;
import com.fasterxml.jackson.databind.ObjectMapper;

@AutoConfigureRestDocs
@WebMvcTest({
    UserController.class,
    OAuthController.class,
    IssueController.class,
    MilestoneController.class,
    LabelController.class,
    S3Controller.class
})
public class ControllerTest {

    @MockBean
    protected JwtTokenProvider tokenProvider;

    @MockBean
    protected OAuthService oAuthService;

    @MockBean
    protected UserService userService;

    @MockBean
    protected IssueService issueService;

    @MockBean
    protected MilestoneService milestoneService;

    @MockBean
    protected LabelService labelService;

    @MockBean
    protected S3Uploader uploader;

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        given(tokenProvider.parsePayload("testToken"))
            .willReturn("10");

        given(oAuthService.isLogout("10"))
            .willReturn(false);
    }
}
