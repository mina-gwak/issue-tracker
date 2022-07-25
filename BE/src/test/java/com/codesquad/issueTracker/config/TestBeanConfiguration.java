package com.codesquad.issueTracker.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import com.codesquad.issueTracker.authentication.infrastructure.OAuthClientServer;
import com.codesquad.issueTracker.common.mock.MockOAuthClientServer;

@TestConfiguration
public class TestBeanConfiguration {

    @Bean
    public OAuthClientServer oAuthClientServer() {
        return new MockOAuthClientServer();
    }
}
