package com.codesquad.issueTracker.exception.issue;

import org.springframework.http.HttpStatus;

import com.codesquad.issueTracker.exception.ApplicationException;

public class InvalidFilterException extends ApplicationException {

    private static final String MESSAGE = "유효하지 않는 필터입니다. 다음 필터를 사용하세요. [main : OPEN, CLOSE, WRITE_BY_ME, ASSIGNED_ME, ADD_COMMENT_BY_ME, sub : LABELS, ASSIGNEES, MILESTONES]";
    private static final HttpStatus HTTP_STATUS = HttpStatus.BAD_REQUEST;

    public InvalidFilterException() {
        this(MESSAGE, HTTP_STATUS);
    }

    protected InvalidFilterException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
