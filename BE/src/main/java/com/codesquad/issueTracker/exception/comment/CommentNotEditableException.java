package com.codesquad.issueTracker.exception.comment;

import org.springframework.http.HttpStatus;

import com.codesquad.issueTracker.exception.ApplicationException;

public class CommentNotEditableException extends ApplicationException {

    private static final String MESSAGE = "자신이 작성한 커멘트만 수정할 수 있습니다.";
    private static final HttpStatus HTTP_STATUS = HttpStatus.UNAUTHORIZED;

    public CommentNotEditableException() {
        this(MESSAGE, HTTP_STATUS);
    }

    protected CommentNotEditableException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
