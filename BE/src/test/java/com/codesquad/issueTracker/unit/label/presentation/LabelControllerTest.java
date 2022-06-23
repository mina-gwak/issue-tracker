package com.codesquad.issueTracker.unit.label.presentation;

import static com.codesquad.issueTracker.docs.RestDocsUtils.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import com.codesquad.issueTracker.issue.application.dto.FilterOutlineResponse;
import com.codesquad.issueTracker.unit.ControllerTest;

class LabelControllerTest extends ControllerTest {

    @DisplayName("라벨의 Outline을 가져온다.")
    @Test
    void show_label_outline() throws Exception {
        // given
        FilterOutlineResponse rsp1 = new FilterOutlineResponse("Khan", "#1d76db");
        FilterOutlineResponse rsp2 = new FilterOutlineResponse("Lucid", "#008672");
        FilterOutlineResponse rsp3 = new FilterOutlineResponse("Jamie", "#561D05");
        List<FilterOutlineResponse> responseList = List.of(rsp1, rsp2, rsp3);

        given(labelService.findLabelsOutlineInfo())
            .willReturn(responseList);

        // when
        ResultActions perform = mockMvc.perform(get("/api/labels")
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.filterOutlineResponses.length()").value(3))
            .andExpect(jsonPath("$.filterOutlineResponses[1].name").value("Lucid"))
            .andExpect(jsonPath("$.filterOutlineResponses[1].image").value("#008672"));

        perform.andDo(
            document("get-label-filter-info", getDocumentRequest(), getDocumentResponse(),
                responseFields(
                    fieldWithPath("filterOutlineResponses[].name").description("라벨 이름"),
                    fieldWithPath("filterOutlineResponses[].image").description("라벨 색")
                )));
    }
}
