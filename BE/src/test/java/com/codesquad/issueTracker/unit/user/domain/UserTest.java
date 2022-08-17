package com.codesquad.issueTracker.unit.user.domain;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import com.codesquad.issueTracker.user.domain.User;

public class UserTest {

    @DisplayName("자신의 아이디이면 true를, 아니면 false를 반환한다.")
    @ParameterizedTest
    @CsvSource({"1, 1, true", "1, 2, false"})
    void true_if_own_id_else_false(Long ownId, Long checkId, boolean result) {
        User user = new User(ownId, "name1", "nickName1", "image1");
        Assertions.assertThat(user.isYourId(checkId)).isEqualTo(result);
    }
}
