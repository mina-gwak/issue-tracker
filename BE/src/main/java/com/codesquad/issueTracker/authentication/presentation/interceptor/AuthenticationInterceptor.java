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
import com.codesquad.issueTracker.exception.authentication.TokenNotFoundException;

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
            log.debug("테스트 유저 접속");
            request.setAttribute("userId", Long.parseLong(userId));
            return true;
        }

        if (oAuthService.isLogout(userId)) {
            log.debug("{}에 접근을 위해 로그인이 필요합니다.", request.getRequestURI());
            return false;
        }
        request.setAttribute("userId", Long.parseLong(userId));
        return true;
    }

    private String resolveToken(HttpServletRequest request) {
        String authorizationInfo = request.getHeader("Authorization");
        if (authorizationInfo == null) {
            log.debug("[preHandle][JWT Token 에러 발생]");
            log.debug("request uri is : {}", request.getRequestURI());
            throw new TokenNotFoundException();
        }
        String[] parts = authorizationInfo.split(" ");
        if (isNotValidForm(parts)) {
            log.debug("[preHandle][JWT Token 에러 발생]");
            throw new TokenNotFoundException();
        }
        return parts[1];
    }

    private boolean isNotValidForm(String[] parts) {
        return parts.length != 2 || !parts[0].equals("Bearer");
    }
}
