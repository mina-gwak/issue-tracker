package com.codesquad.issueTracker.exception.issue;

import org.springframework.http.HttpStatus;

import com.codesquad.issueTracker.exception.ApplicationException;

public class IssueNotFoundException extends ApplicationException {

    private static final String MESSAGE = "해당 이슈를 찾을 수 없습니다.";
    private static final HttpStatus HTTP_STATUS = HttpStatus.BAD_REQUEST;

    public IssueNotFoundException() {
        this(MESSAGE, HTTP_STATUS);
    }

    protected IssueNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
