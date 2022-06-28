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
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.codesquad.issueTracker.issue.application.dto.IssueCoverResponse;
import com.codesquad.issueTracker.issue.application.dto.IssueCoversResponse;
import com.codesquad.issueTracker.issue.application.dto.LabelCoverResponse;
import com.codesquad.issueTracker.issue.application.dto.PopUpResponse;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.unit.ControllerTest;

class IssueControllerTest extends ControllerTest {

    @DisplayName("query에 filter를 지정해서 요청한다.")
    @Test
    void request_with_main_filter() throws Exception {
        // given
        LabelCoverResponse label1 = new LabelCoverResponse("Lucid", "#008672", "white");
        LabelCoverResponse label2 = new LabelCoverResponse("BE", "#000000", "white");

        IssueCoverResponse issue1 = new IssueCoverResponse(List.of(label1, label2), "BE Lucid가 작성한 issue",
            1L, "루시드", "image3", LocalDateTime.now(), "BE milestone", true);

        List<IssueCoverResponse> responses = List.of(issue1);

        given(issueService.findIssuesByCondition(eq("is:open"), anyLong()))
            .willReturn(new IssueCoversResponse(responses, 1, 2));

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
                        .description(
                            "is:open(열린 이슈), is:close(닫힌 이슈), is:write_by_me(내가 작성한 이슈), is:assigned_me(나에게 할당된 이슈), is:add_comment_by_me(내가 댓글을 남긴 이슈)")
                ),
                responseFields(
                    fieldWithPath("issueCoverResponses[].labelCoverResponses").type(ARRAY).description("라벨 리스트"),
                    fieldWithPath("issueCoverResponses[].labelCoverResponses[].labelName").type(STRING)
                        .description("라벨 이름"),
                    fieldWithPath("issueCoverResponses[].labelCoverResponses[].labelColor").type(STRING)
                        .description("라벨 색"),
                    fieldWithPath("issueCoverResponses[].labelCoverResponses[].textColor").type(STRING)
                        .description("라벨 텍스트 색"),
                    fieldWithPath("issueCoverResponses[].title").type(STRING).description("이슈 이름"),
                    fieldWithPath("issueCoverResponses[].issueId").type(NUMBER).description("이슈 id"),
                    fieldWithPath("issueCoverResponses[].writer").type(STRING).description("작성자 이름"),
                    fieldWithPath("issueCoverResponses[].writerImage").type(STRING).description("작성자 이미지"),
                    fieldWithPath("issueCoverResponses[].modificationTime").type(STRING).description("최종 수정 시간"),
                    fieldWithPath("issueCoverResponses[].milestoneName").type(STRING).description("마일스톤 이름"),
                    fieldWithPath("issueCoverResponses[].opened").type(BOOLEAN).description("open / close 여부"),
                    fieldWithPath("openIssueCount").type(NUMBER).description("open 수"),
                    fieldWithPath("closeIssueCount").type(NUMBER).description("close 수")
                )));
    }

    @DisplayName("팝업 데이터를 통해 간략한 이슈 정보를 확인할 수 있다.")
    @Test
    void request_popUp_data() throws Exception {
        // given
        Issue issue = new Issue("BE Lucid가 작성한 issue", "내용은 이러하다", LocalDateTime.now(), LocalDateTime.now());

        Long issueId = 1L;
        given(issueService.popUpIssue(eq(issueId), anyLong()))
            .willReturn(new PopUpResponse(issue, true));

        // when
        ResultActions perform = mockMvc.perform(
            RestDocumentationRequestBuilders.get("/api/issues/{issueId}/popUp", issueId)
                .header("Authorization", "Bearer testToken")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.ALL));

        // then
        perform
            .andExpect(status().isOk());

        // restdocs
        perform.andDo(
            document("get-popUp-data", getDocumentRequest(), getDocumentResponse(),
                pathParameters(
                    parameterWithName("issueId").description("이슈 id")
                ),
                responseFields(
                    fieldWithPath("title").type(STRING).description("이슈 타이틀"),
                    fieldWithPath("content").type(STRING).description("이슈 내용 요약"),
                    fieldWithPath("writtenTime").type(STRING).description("이슈가 작성된 시간"),
                    fieldWithPath("assignedMe").type(BOOLEAN).description("나에게 할당되었는지 여부")
                )));
    }

    @DisplayName("이슈를 묶어서 상태 변경이 가능하다.")
    @Test
    void change_issue_status() throws Exception {
        // given
        MultiValueMap<String, String> paraMap = new LinkedMultiValueMap<>();
        List<String> resultListOfString = List.of("1", "3", "5");
        List<Long> resultListOfLong = List.of(1L, 3L, 5L);

        paraMap.addAll("id", resultListOfString);

        // when
        ResultActions perform = mockMvc.perform(put("/api/issues/status")
            .header("Authorization", "Bearer testToken")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.ALL)
            .queryParams(paraMap)
            .queryParam("status", "true"));

        // then
        perform
            .andExpect(status().isOk());

        verify(issueService, times(1))
            .changeIssuesStatus(resultListOfLong, "true");

        // restdocs
        perform.andDo(
            document("status-change", getDocumentRequest(), getDocumentResponse(),
                requestParameters(
                    parameterWithName("id").description("변경하고자 하는 issueId를 여러개 쿼리 파라미터로 입력"),
                    parameterWithName("status").description("변경하고자 하는 상태")
                )));
    }
}
