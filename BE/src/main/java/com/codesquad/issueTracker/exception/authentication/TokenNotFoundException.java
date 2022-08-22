package com.codesquad.issueTracker.exception.authentication;

import org.springframework.http.HttpStatus;

import com.codesquad.issueTracker.exception.ApplicationException;

public class TokenNotFoundException extends ApplicationException {

    private static final String MESSAGE = "토큰을 찾을 수 없습니다.";
    private static final HttpStatus HTTP_STATUS = HttpStatus.UNAUTHORIZED;

    public TokenNotFoundException() {
        this(MESSAGE, HTTP_STATUS);
    }

    protected TokenNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
