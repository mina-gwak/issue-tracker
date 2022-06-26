package com.codesquad.issueTracker.unit.issue.presentation;

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
import org.springframework.test.web.servlet.ResultActions;

import com.codesquad.issueTracker.issue.application.dto.IssueCoverResponse;
import com.codesquad.issueTracker.issue.application.dto.LabelCoverResponse;
import com.codesquad.issueTracker.unit.ControllerTest;

class IssueControllerTest extends ControllerTest {

    @DisplayName("query에 Main filter 하나를 지정해서 요청한다.")
    @Test
    void request_with_main_filter() throws Exception {
        // given
        LabelCoverResponse label1 = new LabelCoverResponse("Lucid", "#008672", "white");
        LabelCoverResponse label2 = new LabelCoverResponse("BE", "#000000", "white");

        IssueCoverResponse issue1 = new IssueCoverResponse(List.of(label1, label2), "BE Lucid가 작성한 issue",
            1L, "루시드", "image3", LocalDateTime.now(), "BE milestone", true);

        List<IssueCoverResponse> responses = List.of(issue1);

        given(issueService.findIssuesByCondition(eq("is:open"), anyLong()))
            .willReturn(responses);

        // when
        ResultActions perform = mockMvc.perform(get("/api/issues")
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.ALL)
            .queryParam("query", "is:open"));

        // then
        perform
            .andExpect(status().isOk());

        // restdocs
        perform.andDo(
            document("get-issue-with-main-filter", getDocumentRequest(), getDocumentResponse(),
                requestParameters(
                    parameterWithName("query")
                        .description("is:open(열린 이슈), is:close(닫힌 이슈), is:write_by_me(내가 작성한 이슈), is:assigned_me(나에게 할당된 이슈), is:add_comment_by_me(내가 댓글을 남긴 이슈")
                ),
                responseFields(
                    fieldWithPath("[].labelCoverResponses").type(ARRAY).description("라벨 리스트"),
                    fieldWithPath("[].labelCoverResponses[].labelName").type(STRING).description("라벨 이름"),
                    fieldWithPath("[].labelCoverResponses[].labelColor").type(STRING).description("라벨 색"),
                    fieldWithPath("[].labelCoverResponses[].textColor").type(STRING).description("라벨 텍스트 색"),
                    fieldWithPath("[].title").type(STRING).description("이슈 이름"),
                    fieldWithPath("[].issueId").type(NUMBER).description("이슈 id"),
                    fieldWithPath("[].writer").type(STRING).description("작성자 이름"),
                    fieldWithPath("[].writerImage").type(STRING).description("작성자 이미지"),
                    fieldWithPath("[].modificationTime").type(STRING).description("최종 수정 시간"),
                    fieldWithPath("[].milestoneName").type(STRING).description("마일스톤 이름"),
                    fieldWithPath("[].opened").type(BOOLEAN).description("open / close 여부")
                    )));
    }
}
