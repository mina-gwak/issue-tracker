package com.codesquad.issueTracker.exception;

public class ErrorResponse {
    private final String errorMessage;
    private final String status;

    public ErrorResponse(String errorMessage, String status) {
        this.errorMessage = errorMessage;
        this.status = status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public String getStatus() {
        return status;
    }
}
