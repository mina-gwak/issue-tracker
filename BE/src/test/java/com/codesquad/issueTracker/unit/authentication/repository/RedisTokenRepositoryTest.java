package com.codesquad.issueTracker.unit.authentication.repository;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.codesquad.issueTracker.authentication.domain.repository.RedisTokenRepository;
import com.codesquad.issueTracker.common.mock.MockRedisTemplate;

public class RedisTokenRepositoryTest {

    private RedisTokenRepository tokenRepository;

    @BeforeEach
    void init() {
        tokenRepository = new RedisTokenRepository(new MockRedisTemplate(), 1000);
    }

    @DisplayName("username을 key로, refreshToken을 value로 저장하고 불러온다.")
    @Test
    void save_and_find_by_key() {
        // given
        tokenRepository.insert("testUserName", "refresh_token");

        // when
        String result = tokenRepository.findByKey("testUserName").get();

        // then
        assertThat(result).isEqualTo("refresh_token");
    }

    @DisplayName("delete 시 empty로 저장된다.")
    @Test
    void empty_when_delete() {
        // given
        tokenRepository.insert("testUserName", "refresh_token");

        // when
        tokenRepository.delete("testUserName");
        String result = tokenRepository.findByKey("testUserName").get();

        // then
        assertThat(result).isEqualTo("");
    }

}
