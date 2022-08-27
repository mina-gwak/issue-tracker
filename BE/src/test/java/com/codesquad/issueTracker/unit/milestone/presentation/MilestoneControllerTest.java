package com.codesquad.issueTracker.unit.milestone.presentation;

import static com.codesquad.issueTracker.docs.RestDocsUtils.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.payload.JsonFieldType.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.ResultActions;

import com.codesquad.issueTracker.milestone.application.dto.MilestoneOutlineResponse;
import com.codesquad.issueTracker.milestone.application.dto.MilestoneSingleInfoResponse;
import com.codesquad.issueTracker.milestone.application.dto.MilestonesResponse;
import com.codesquad.issueTracker.milestone.domain.Milestone;
import com.codesquad.issueTracker.milestone.presentation.dto.MilestoneContentRequest;
import com.codesquad.issueTracker.unit.ControllerTest;

class MilestoneControllerTest extends ControllerTest {

    @DisplayName("마일스톤의 Outline을 가져온다.")
    @Test
    void show_milestone_outline() throws Exception {
        // given
        MilestoneOutlineResponse rsp1 = new MilestoneOutlineResponse("milestone1");
        MilestoneOutlineResponse rsp2 = new MilestoneOutlineResponse("milestone2");
        MilestoneOutlineResponse rsp3 = new MilestoneOutlineResponse("milestone3");
        List<MilestoneOutlineResponse> responseList = List.of(rsp1, rsp2, rsp3);

        given(milestoneService.findMilestonesOutlineInfo())
            .willReturn(responseList);

        // when
        ResultActions perform = mockMvc.perform(get("/api/milestones")
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.milestonesOutlineResponses.length()").value(3))
            .andExpect(jsonPath("$.milestonesOutlineResponses[1].optionName").value("milestone2"));

        perform.andDo(
            document("get-milestone-filter-info", getDocumentRequest(), getDocumentResponse(),
                responseFields(
                    fieldWithPath("milestonesOutlineResponses[].optionName").description("마일스톤 이름")
                )));
    }

    @DisplayName("마일스톤 리스트를 조회한다.")
    @Test
    void show_milestone_list() throws Exception {
        // given
        Milestone m1 = new Milestone("m1", LocalDateTime.now(), "m1 입니다.");
        Milestone m2 = new Milestone("m2", LocalDateTime.now(), "m2 입니다.");
        Milestone m3 = new Milestone("m3", LocalDateTime.now(), "m3 입니다.");
        MilestoneSingleInfoResponse m1Info = new MilestoneSingleInfoResponse(m1);
        MilestoneSingleInfoResponse m2Info = new MilestoneSingleInfoResponse(m2);
        MilestoneSingleInfoResponse m3Info = new MilestoneSingleInfoResponse(m3);
        MilestonesResponse response = new MilestonesResponse(List.of(m1Info, m2Info, m3Info), 2, 3);

        given(milestoneService.findMilestones("true"))
            .willReturn(response);

        // when
        ResultActions perform = mockMvc.perform(get("/api/milestones/list")
            .header("Authorization", "Bearer testToken")
            .queryParam("open", "true")
            .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.milestoneSingleInfos.length()").value(3))
            .andExpect(jsonPath("$.milestoneSingleInfos[1].name").value("m2"))
            .andExpect(jsonPath("$.openMilestoneCount").value(2))
            .andExpect(jsonPath("$.closeMilestoneCount").value(3));

        // docs
        perform.andDo(
            document("get-milestone-list", getDocumentRequest(), getDocumentResponse(),
                requestParameters(
                    parameterWithName("open")
                        .description(
                            "true : 열린 이슈, false : 닫힌 이슈")
                ),
                responseFields(
                    fieldWithPath("milestoneSingleInfos[].id").type(NULL).description("마일스톤 아이디 - long type"),
                    fieldWithPath("milestoneSingleInfos[].name").type(STRING).description("마일스톤 이름"),
                    fieldWithPath("milestoneSingleInfos[].dueDate").type(STRING).description("마일스톤 완료 예정 날짜"),
                    fieldWithPath("milestoneSingleInfos[].description").type(STRING).description("마일스톤 상세"),
                    fieldWithPath("milestoneSingleInfos[].openIssueCount").type(NUMBER).description("열린 이슈 개수"),
                    fieldWithPath("milestoneSingleInfos[].closeIssueCount").type(NUMBER).description("닫힌 이슈 개수"),
                    fieldWithPath("milestoneSingleInfos[].ratio").type(STRING).description("닫힌 이슈 / 총 이슈 비율, 범위 : 0.00 ~ 100.00"),
                    fieldWithPath("openMilestoneCount").type(NUMBER).description("열린 마일스톤 수"),
                    fieldWithPath("closeMilestoneCount").type(NUMBER).description("닫힌 마일스톤 수")
                )));
    }

    @DisplayName("마일스톤을 추가한다.")
    @Test
    void add_milestone() throws Exception {
        // given
        MilestoneContentRequest request = new MilestoneContentRequest("milestone1", LocalDateTime.now(), "마일스톤입니다.");

        String content = objectMapper.writeValueAsString(request);

        // when
        ResultActions perform = mockMvc.perform(post("/api/milestones")
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .content(content)
            .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk());

        verify(milestoneService, times(1))
            .createMilestone(eq(request));

        // docs
        perform.andDo(
            document("make-milestone", getDocumentRequest(), getDocumentResponse(),
                requestFields(
                    fieldWithPath("name").description("마일스톤 이름"),
                    fieldWithPath("dueDate").description(
                        "마일스톤 완료일. yyyy-MM-ddTHH:mm:ss 형태로 전송(ex : 2022-07-16T00:00:00)"),
                    fieldWithPath("description").description("마일스톤 설명")
                )));
    }

    @DisplayName("마일스톤을 수정 한다.")
    @Test
    void edit_milestone() throws Exception {
        // given
        MilestoneContentRequest request = new MilestoneContentRequest("milestone1", LocalDateTime.now(), "마일스톤입니다.");
        String content = objectMapper.writeValueAsString(request);

        Long milestoneId = 1L;

        // when
        ResultActions perform = mockMvc.perform(
            RestDocumentationRequestBuilders.patch("/api/milestones/{milestoneId}", milestoneId)
                .header("Authorization", "Bearer testToken")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk());

        verify(milestoneService, times(1))
            .editMilestone(eq(1L), eq(request));

        // docs
        perform.andDo(
            document("edit-milestone", getDocumentRequest(), getDocumentResponse(),
                pathParameters(
                    parameterWithName("milestoneId").description("마일스톤 아이디")
                ),
                requestFields(
                    fieldWithPath("name").description("마일스톤 이름"),
                    fieldWithPath("dueDate").description(
                        "마일스톤 완료일. yyyy-MM-ddTHH:mm:ss 형태로 전송(ex : 2022-07-16T00:00:00)"),
                    fieldWithPath("description").description("마일스톤 설명")
                )));
    }

    @DisplayName("마일스톤의 상태를 변경한다.")
    @Test
    void change_milestone_status() throws Exception {
        // given
        Long milestoneId = 1L;
        String open = "true";

        // when
        ResultActions perform = mockMvc.perform(
            RestDocumentationRequestBuilders.patch("/api/milestones/{milestoneId}/change", milestoneId)
                .header("Authorization", "Bearer testToken")
                .queryParam("open", open)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk());

        verify(milestoneService, times(1))
            .changeStatus(eq(1L), eq(open));

        // docs
        perform.andDo(
            document("change-milestone-status", getDocumentRequest(), getDocumentResponse(),
                pathParameters(
                    parameterWithName("milestoneId").description("마일스톤 아이디")
                ),
                requestParameters(
                    parameterWithName("open").description("마일스톤 open/close를 true/false로 전달한다.")
                )));
    }

    @DisplayName("마일스톤을 제거한다.")
    @Test
    void delete_milestone() throws Exception {
        // given
        Long milestoneId = 1L;

        // when
        ResultActions perform = mockMvc.perform(
            RestDocumentationRequestBuilders.delete("/api/milestones/{milestoneId}", milestoneId)
                .header("Authorization", "Bearer testToken")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk());

        verify(milestoneService, times(1))
            .deleteLabels(eq(1L));

        // docs
        perform.andDo(
            document("delete-milestone", getDocumentRequest(), getDocumentResponse(),
                pathParameters(
                    parameterWithName("milestoneId").description("마일스톤 아이디")
                )));
    }
}
