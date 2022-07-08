package com.codesquad.issueTracker.unit.label.presentation;

import static com.codesquad.issueTracker.docs.RestDocsUtils.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.payload.JsonFieldType.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import javax.print.DocFlavor;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.ResultActions;

import com.codesquad.issueTracker.issue.presentation.dto.CommentsRequest;
import com.codesquad.issueTracker.label.application.dto.LabelListResponse;
import com.codesquad.issueTracker.label.application.dto.LabelOutlineResponse;
import com.codesquad.issueTracker.label.domain.Label;
import com.codesquad.issueTracker.label.presentation.dto.LabelAddRequest;
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
            .andExpect(jsonPath("$.labelsOutlineResponses.length()").value(3))
            .andExpect(jsonPath("$.labelsOutlineResponses[1].optionName").value("Lucid"))
            .andExpect(jsonPath("$.labelsOutlineResponses[1].colorCode").value("#008672"));

        perform.andDo(
            document("get-label-filter-info", getDocumentRequest(), getDocumentResponse(),
                responseFields(
                    fieldWithPath("labelsOutlineResponses[].optionName").type(STRING).description("라벨 이름"),
                    fieldWithPath("labelsOutlineResponses[].colorCode").type(STRING).description("라벨 색")
                )));
    }

    @DisplayName("라벨 상세를 모두 조회한다.")
    @Test
    void show_labels() throws Exception {
        // given
        Label l1 = new Label(1L, "label1", "desc1", "white", "black");
        Label l2 = new Label(2L, "label2", "desc2", "red", "blue");
        LabelListResponse response = new LabelListResponse(List.of(l1, l2));

        given(labelService.findLabelsList())
            .willReturn(response);

        // when
        ResultActions perform = mockMvc.perform(get("/api/labels/list")
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.labelCount").value(2))
            .andExpect(jsonPath("$.labelDetails[1].name").value("label2"))
            .andExpect(jsonPath("$.labelDetails[1].description").value("desc2"))
            .andExpect(jsonPath("$.labelDetails[1].colorCode").value("red"))
            .andExpect(jsonPath("$.labelDetails[1].textColor").value("blue"));

        // docs
        perform.andDo(
            document("get-label-list", getDocumentRequest(), getDocumentResponse(),
                responseFields(
                    fieldWithPath("labelCount").type(NUMBER).description("라벨 전체 수"),
                    fieldWithPath("labelDetails[].id").type(NUMBER).description("라벨 id"),
                    fieldWithPath("labelDetails[].name").type(STRING).description("라벨 이름"),
                    fieldWithPath("labelDetails[].description").type(STRING).description("라벨 상세"),
                    fieldWithPath("labelDetails[].colorCode").type(STRING).description("라벨 색"),
                    fieldWithPath("labelDetails[].textColor").type(STRING).description("라벨 텍스트 색")
                )));
    }

    @DisplayName("새로운 라벨을 추가한다.")
    @Test
    void add_single_label() throws Exception {
        // given
        LabelAddRequest request = new LabelAddRequest("label1", "desc1", "white", "black");
        String contents = objectMapper.writeValueAsString(request);

        // when
        ResultActions perform = mockMvc.perform(post("/api/labels")
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .content(contents)
            .accept(MediaType.ALL));

        // then
        verify(labelService, times(1))
            .addLabels(any(LabelAddRequest.class));

        perform
            .andExpect(status().isOk());

        // docs
        perform.andDo(
            document("add-label", getDocumentRequest(), getDocumentResponse(),
                requestFields(
                    fieldWithPath("name").type(STRING).description("라벨 이름"),
                    fieldWithPath("description").type(STRING).description("라벨 상세"),
                    fieldWithPath("colorCode").type(STRING).description("라벨 색상"),
                    fieldWithPath("textColor").type(STRING).description("라벨 텍스트 색상")
                )));
    }

    @DisplayName("라벨을 수정한다.")
    @Test
    void edit_single_label() throws Exception {
        // given
        Long labelId = 1L;
        LabelAddRequest request = new LabelAddRequest("label1", "desc1", "white", "black");
        String contents = objectMapper.writeValueAsString(request);

        // when
        ResultActions perform = mockMvc.perform(
            RestDocumentationRequestBuilders.patch("/api/labels/{labelId}", labelId)
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .content(contents)
            .accept(MediaType.ALL));

        // then
        verify(labelService, times(1))
            .editLabels(eq(1L), any(LabelAddRequest.class));

        perform
            .andExpect(status().isOk());

        // docs
        perform.andDo(
            document("edit-label", getDocumentRequest(), getDocumentResponse(),
                pathParameters(
                    parameterWithName("labelId").description("라벨 id")
                ),
                requestFields(
                    fieldWithPath("name").type(STRING).description("라벨 이름"),
                    fieldWithPath("description").type(STRING).description("라벨 상세"),
                    fieldWithPath("colorCode").type(STRING).description("라벨 색상"),
                    fieldWithPath("textColor").type(STRING).description("라벨 텍스트 색상")
                )));
    }

    @DisplayName("라벨을 삭제한다.")
    @Test
    void delete_single_label() throws Exception {
        // given
        Long labelId = 1L;

        // when
        ResultActions perform = mockMvc.perform(
            RestDocumentationRequestBuilders.delete("/api/labels/{labelId}", labelId)
                .header("Authorization", "Bearer testToken")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.ALL));

        // then
        verify(labelService, times(1))
            .deleteLabels(eq(1L));

        perform
            .andExpect(status().isOk());

        // docs
        perform.andDo(
            document("delete-label", getDocumentRequest(), getDocumentResponse(),
                pathParameters(
                    parameterWithName("labelId").description("라벨 id")
                )));
    }
}
