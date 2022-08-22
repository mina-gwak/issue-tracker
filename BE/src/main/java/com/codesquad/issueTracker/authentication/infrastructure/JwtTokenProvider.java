package com.codesquad.issueTracker.authentication.infrastructure;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.codesquad.issueTracker.exception.authentication.TokenExpireException;
import com.codesquad.issueTracker.exception.authentication.TokenNotFoundException;

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
        return createToken(payload, refreshTokenValidityTime);
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

    public String parsePayload(String token) {
        try {
            return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        } catch (ExpiredJwtException e) {
            log.debug("token expired. message : {}", e.getMessage());
            throw new TokenExpireException();
        } catch (JwtException | IllegalArgumentException e) {
            log.debug("jwt token exception. message : {}", e.getMessage());
            throw new TokenNotFoundException();
        }
    }
}
