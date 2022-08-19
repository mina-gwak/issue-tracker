package com.codesquad.issueTracker.exception.comment;

import org.springframework.http.HttpStatus;

import com.codesquad.issueTracker.exception.ApplicationException;

public class CommentNotFoundException extends ApplicationException {

    private static final String MESSAGE = "해당 comment를 찾을 수 없습니다.";
    private static final HttpStatus HTTP_STATUS = HttpStatus.BAD_REQUEST;

    public CommentNotFoundException() {
        this(MESSAGE, HTTP_STATUS);
    }

    protected CommentNotFoundException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
