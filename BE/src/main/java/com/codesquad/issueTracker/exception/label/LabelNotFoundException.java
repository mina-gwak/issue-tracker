package com.codesquad.issueTracker.exception.label;

import org.springframework.http.HttpStatus;

import com.codesquad.issueTracker.exception.ApplicationException;

public class LabelNotFoundException extends ApplicationException {

    private static final String MESSAGE = "해당 라벨을 찾을 수 없습니다.";
    private static final HttpStatus HTTP_STATUS = HttpStatus.BAD_REQUEST;

    public LabelNotFoundException() {
        this(MESSAGE, HTTP_STATUS);
    }

    protected LabelNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
