package com.codesquad.issueTracker.common.presentation.dto;

import lombok.Getter;

@Getter
public class UploadedFileResponse {
    private String fileUrl;

    public UploadedFileResponse(String fileUrl) {
        this.fileUrl = fileUrl;
    }
}
