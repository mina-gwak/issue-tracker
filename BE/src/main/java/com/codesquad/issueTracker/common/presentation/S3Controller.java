package com.codesquad.issueTracker.common.presentation;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.codesquad.issueTracker.common.application.S3Uploader;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/common")
@RequiredArgsConstructor
@RestController
public class S3Controller {

    private final S3Uploader uploader;

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile multipartFile) throws IOException {
        return ResponseEntity.ok(uploader.upload(multipartFile, "static"));
    }
}
