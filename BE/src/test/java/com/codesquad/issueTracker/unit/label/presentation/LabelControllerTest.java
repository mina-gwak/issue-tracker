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

import com.codesquad.issueTracker.label.application.dto.LabelOutlineResponse;
import com.codesquad.issueTracker.unit.ControllerTest;

class LabelControllerTest extends ControllerTest {

    @DisplayName("라벨의 Outline을 가져온다.")
    @Test
    void show_label_outline() throws Exception {
        // given
        LabelOutlineResponse rsp1 = new LabelOutlineResponse("Khan", "#1d76db");
        LabelOutlineResponse rsp2 = new LabelOutlineResponse("Lucid", "#008672");
        LabelOutlineResponse rsp3 = new LabelOutlineResponse("Jamie", "#561D05");
        List<LabelOutlineResponse> responseList = List.of(rsp1, rsp2, rsp3);

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
            .andExpect(jsonPath("$.labelOutlineResponses.length()").value(3))
            .andExpect(jsonPath("$.labelOutlineResponses[1].name").value("Lucid"))
            .andExpect(jsonPath("$.labelOutlineResponses[1].colorCode").value("#008672"));

        perform.andDo(
            document("get-label-filter-info", getDocumentRequest(), getDocumentResponse(),
                responseFields(
                    fieldWithPath("labelOutlineResponses[].name").description("라벨 이름"),
                    fieldWithPath("labelOutlineResponses[].colorCode").description("라벨 색")
                )));
    }
}
