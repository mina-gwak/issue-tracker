package com.codesquad.issueTracker.unit.common.presentation;

import static com.codesquad.issueTracker.docs.RestDocsUtils.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.payload.JsonFieldType.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AssertionsKt;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.ResultActions;

import com.codesquad.issueTracker.unit.ControllerTest;

class S3ControllerTest extends ControllerTest {

    @DisplayName("파일이 업로드되면 경로가 반환된다.")
    @Test
    void file_upload() throws Exception {
        // given
        MockMultipartFile file = new MockMultipartFile("file", "image.png", "image/png", "contents".getBytes());

        given(uploader.upload(eq(file), eq("static")))
            .willReturn("uploadedFileUrl");

        // when
        ResultActions perform = mockMvc.perform(multipart("/api/common/upload")
            .file(file)
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.fileUrl").value("uploadedFileUrl"));

        verify(uploader, times(1))
            .upload(eq(file), eq("static"));

        // restdocs
        perform.andDo(
            document("add-file", getDocumentRequest(), getDocumentResponse(),
                requestParts(
                    partWithName("file").description("업로드 할 파일")
                ),
                responseFields(
                    fieldWithPath("fileUrl").type(STRING).description("업로드 후 파일 url")
                )));
    }
}
