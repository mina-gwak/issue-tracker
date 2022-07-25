package com.codesquad.issueTracker.unit.issue.infrastructure;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import com.codesquad.issueTracker.issue.application.dto.FilterCondition;
import com.codesquad.issueTracker.issue.domain.MainFilter;
import com.codesquad.issueTracker.issue.infrastructure.QueryParser;

public class QueryParserTest {

    private QueryParser queryParser = new QueryParser();

    @DisplayName("정상적인 쿼리가 전달되면, FilterCondition으로 변경해준다")
    @Test
    void filter_parsing_success() {
        // given
        String filterQuery = "is:open label:BE milestone:m1 label:FE";

        // when
        FilterCondition filterCondition = queryParser.makeFilterCondition(filterQuery);

        // then
        assertThat(filterCondition.getMainFilter()).isEqualTo(MainFilter.OPEN);
        assertThat(filterCondition.getSubFilters().get("LABEL").size()).isEqualTo(2);
        assertThat(filterCondition.getSubFilters().get("MILESTONE").size()).isEqualTo(1);
    }

    @ParameterizedTest
    @DisplayName("메인 필터 혹은 서브 필터가 유효하지 않다면, 예외가 발생한다.")
    @ValueSource(strings = {"is:test label:BE", "is:open lava:BE", "is:open label:BE stone:FE"})
    void filter_parsing_fail(String filterQuery) {
        // when & then
        Assertions.assertThrows(IllegalStateException.class, () ->
            queryParser.makeFilterCondition(filterQuery));
    }

}
