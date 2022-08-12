package com.codesquad.issueTracker.authentication.presentation.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.codesquad.issueTracker.authentication.application.OAuthService;
import com.codesquad.issueTracker.authentication.infrastructure.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class AuthenticationInterceptor implements HandlerInterceptor {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationInterceptor.class);
    private final JwtTokenProvider tokenProvider;
    private final OAuthService oAuthService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }
        String token = resolveToken(request);
        log.debug("token is : {}", token);
        String userId = tokenProvider.parsePayload(token);

        // Todo : 임시 자격(삭제 예정)
        if (userId.equals("1")) {
            log.info("테스트 유저 접속");
            request.setAttribute("userId", Long.parseLong(userId));
            return true;
        }

        if (oAuthService.isLogout(userId)) {
            log.info("{}에 접근을 위해 로그인이 필요합니다.", request.getRequestURI());
            return false;
        }
        request.setAttribute("userId", Long.parseLong(userId));
        return true;
    }

    private String resolveToken(HttpServletRequest request) {
        String authorizationInfo = request.getHeader("Authorization");
        if (authorizationInfo == null) {
            log.info("[preHandle][JWT Token 에러 발생]");
            log.info("request uri is : {}", request.getRequestURI());
            throw new IllegalStateException("토큰이 없습니다. 로그인 먼저 해주세요.");
        }
        String[] parts = authorizationInfo.split(" ");
        if (isNotValidToken(parts)) {
            log.info("[preHandle][JWT Token 에러 발생]");
            throw new IllegalStateException("정상적인 형태로 토큰을 전달해주세요.");
        }
        return parts[1];
    }

    private boolean isNotValidToken(String[] parts) {
        return parts.length != 2 || !parts[0].equals("Bearer");
    }
}
