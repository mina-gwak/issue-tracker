package com.codesquad.issueTracker.authentication.domain.repository;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

@Component
public class RedisTokenRepository {

    private final ValueOperations<String, String> opsForValue;
    private final long refreshTokenValidityTimeInSeconds;

    public RedisTokenRepository(
        RedisTemplate<String, String> redisTemplate,
        @Value("${jwt.token.refresh-validate-time}") long refreshTokenValidityTimeInSeconds) {
        this.opsForValue = redisTemplate.opsForValue();
        this.refreshTokenValidityTimeInSeconds = refreshTokenValidityTimeInSeconds;
    }

    public void insert(String username, String refreshToken) {
        opsForValue.set(username, refreshToken, refreshTokenValidityTimeInSeconds, TimeUnit.SECONDS);
    }

    public Optional<String> findByKey(String key) {
        return Optional.ofNullable(opsForValue.get(key));
    }

    public void delete(String username) {
        opsForValue.set(username, "", 1, TimeUnit.MILLISECONDS);
    }
}
