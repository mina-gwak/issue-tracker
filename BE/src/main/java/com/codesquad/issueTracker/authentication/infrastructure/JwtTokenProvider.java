package com.codesquad.issueTracker.authentication.infrastructure;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtTokenProvider {

    private final long accessTokenValidityTime;
    private final long refreshTokenValidityTime;
    private final String secretKey;

    public JwtTokenProvider(
        @Value("${jwt.token.access-validate-time}") long accessTokenValidityTime,
        @Value("${jwt.token.refresh-validate-time}") long refreshTokenValidityTime,
        @Value("${jwt.token.token-secret}") String secretKey) {
        this.accessTokenValidityTime = accessTokenValidityTime;
        this.refreshTokenValidityTime = refreshTokenValidityTime;
        this.secretKey = secretKey;
    }

    public String generateAccessToken(String payload) {
        return createToken(payload, accessTokenValidityTime);
    }

    public String generateRefreshToken(String payload) {
        return createToken(null, refreshTokenValidityTime);
    }

    private String createToken(String payload, long expireTime) {
        Claims claims = Jwts.claims().setSubject(payload);
        Date createdDate = new Date();
        Date expirationDate = new Date(createdDate.getTime() + expireTime);

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(createdDate)
            .setExpiration(expirationDate)
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
    }

    public Optional<String> parsePayload(String token) {
        try {
            return Optional.ofNullable(Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject());
        } catch (ExpiredJwtException e) {
            log.debug("만료된 토큰입니다. exception message : {}", e.getMessage());
            throw new IllegalArgumentException("만료된 토큰 : " + e.getClaims().getSubject());
        } catch (JwtException | IllegalArgumentException e) {
            log.debug("토큰 parsing 중 예외가 발생하였습니다. exception message : {}", e.getMessage());
            throw new IllegalArgumentException("토큰 parsing 중 예외가 발생하였습니다.");
        }
    }
}
