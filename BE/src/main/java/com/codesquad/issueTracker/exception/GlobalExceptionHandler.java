package com.codesquad.issueTracker.exception;

import static org.springframework.http.HttpStatus.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private static final String LOG_FORMAT =
        "Exception Class : {}, Exception Point : {}, Message : {}";

    private static final int TRACE_POINT = 1;

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<ErrorResponse> globalExceptionResolver(ApplicationException exception) {
        StackTraceElement stackTraceElement = exception.getStackTrace()[TRACE_POINT];
        log.warn(LOG_FORMAT,
            exception.getClass().getSimpleName(),
            stackTraceElement.getClassName() + " : " + stackTraceElement.getMethodName(),
            exception.getMessage());
        return ResponseEntity
            .status(exception.getHttpStatus())
            .body(new ErrorResponse(exception.getMessage(), exception.getHttpStatus().name()));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> uploadSizeExceptionResolver(MaxUploadSizeExceededException exception) {
        StackTraceElement stackTraceElement = exception.getStackTrace()[TRACE_POINT];
        log.warn(LOG_FORMAT,
            exception.getClass().getSimpleName(),
            stackTraceElement.getClassName() + " : " + stackTraceElement.getMethodName(),
            exception.getMessage());
        return ResponseEntity
            .status(BAD_REQUEST)
            .body(new ErrorResponse("업로드 사이즈는 10MB를 넘을 수 없습니다.", BAD_REQUEST.name()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> runtimeExceptionResolver(RuntimeException exception) {
        exception.printStackTrace();
        StackTraceElement stackTraceElement = exception.getStackTrace()[TRACE_POINT];
        log.error(LOG_FORMAT,
            exception.getClass().getSimpleName(),
            stackTraceElement.getClassName() + " : " + stackTraceElement.getMethodName(),
            exception.getMessage());
        return ResponseEntity
            .status(INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse("SERVER_ERROR", INTERNAL_SERVER_ERROR.name()));
    }
}
