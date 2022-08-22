package com.codesquad.issueTracker.exception.common;

import org.springframework.http.HttpStatus;

import com.codesquad.issueTracker.exception.ApplicationException;

public class InternalServerException extends ApplicationException {

    private static final String MESSAGE = "서버 연동 예외 발생";
    private static final HttpStatus HTTP_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;

    public InternalServerException() {
        this(MESSAGE, HTTP_STATUS);
    }

    protected InternalServerException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
