package com.codesquad.issueTracker.exception.issue;

import org.springframework.http.HttpStatus;

import com.codesquad.issueTracker.exception.ApplicationException;

public class IssueNotEditableException extends ApplicationException {

    private static final String MESSAGE = "자신이 작성한 이슈만 수정할 수 있습니다.";
    private static final HttpStatus HTTP_STATUS = HttpStatus.UNAUTHORIZED;

    public IssueNotEditableException() {
        this(MESSAGE, HTTP_STATUS);
    }

    protected IssueNotEditableException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
