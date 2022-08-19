package com.codesquad.issueTracker.exception.user;

import org.springframework.http.HttpStatus;

import com.codesquad.issueTracker.exception.ApplicationException;

public class UserNotFoundException extends ApplicationException {

    private static final String MESSAGE = "유효하지 않은 유저입니다.";
    private static final HttpStatus HTTP_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;


    public UserNotFoundException() {
        this(MESSAGE, HTTP_STATUS);
    }

    protected UserNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
