package com.codesquad.issueTracker.unit.milestone.presentation;

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

import com.codesquad.issueTracker.milestone.application.dto.MilestoneOutlineResponse;
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
            .andExpect(jsonPath("$.milestoneOutlineResponses.length()").value(3))
            .andExpect(jsonPath("$.milestoneOutlineResponses[1].milestoneName").value("milestone2"));

        perform.andDo(
            document("get-milestone-filter-info", getDocumentRequest(), getDocumentResponse(),
                responseFields(
                    fieldWithPath("milestoneOutlineResponses[].milestoneName").description("마일스톤 이름")
                )));
    }
}
