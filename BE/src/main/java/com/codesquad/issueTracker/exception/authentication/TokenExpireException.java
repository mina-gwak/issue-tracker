package com.codesquad.issueTracker.exception.authentication;

import org.springframework.http.HttpStatus;

import com.codesquad.issueTracker.exception.ApplicationException;

public class TokenExpireException extends ApplicationException {

    private static final String MESSAGE = "만료된 토큰입니다.";
    private static final HttpStatus HTTP_STATUS = HttpStatus.UNAUTHORIZED;

    public TokenExpireException() {
        this(MESSAGE, HTTP_STATUS);
    }

    protected TokenExpireException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
