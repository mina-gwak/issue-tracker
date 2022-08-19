package com.codesquad.issueTracker.exception.milestone;

import org.springframework.http.HttpStatus;

import com.codesquad.issueTracker.exception.ApplicationException;

public class MilestoneNotFoundException extends ApplicationException {

    private static final String MESSAGE = "해당 마일스톤을 찾을 수 없습니다.";
    private static final HttpStatus HTTP_STATUS = HttpStatus.BAD_REQUEST;

    public MilestoneNotFoundException() {
        this(MESSAGE, HTTP_STATUS);
    }

    protected MilestoneNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
