package com.codesquad.issueTracker.unit.authentication.domain.repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.codesquad.issueTracker.authentication.domain.repository.RedisTokenRepository;

@SpringBootTest
class RedisTokenRepositoryTest {

    @Autowired
    private RedisTokenRepository redisTokenRepository;

    private String key;
    private String refreshToken;

    @BeforeEach
    void setUp() {
        key = "lucid";
        refreshToken = "token123";
        redisTokenRepository.insert(key, refreshToken);
    }

    @DisplayName("username을 key로, token을 value로 저장을 한 후 성공적으로 불러온다.")
    @Test
    void find_token() {
        // then
        Assertions.assertThat(redisTokenRepository.findByKey(key).get()).isEqualTo(refreshToken);
    }

    @DisplayName("username을 통해 지우게 되면 더이상 조회되지 않는다.")
    @Test
    void delete_and_find_token_invalid() throws InterruptedException {
        // when
        redisTokenRepository.delete(key);
        Thread.sleep(1000);

        // then
        Assertions.assertThat(redisTokenRepository.findByKey(key).isEmpty()).isTrue();
    }
}
