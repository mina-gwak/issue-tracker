package com.codesquad.issueTracker.unit.issue.domain;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Value;

import com.codesquad.issueTracker.comment.domain.Comment;
import com.codesquad.issueTracker.comment.domain.CommentStatus;
import com.codesquad.issueTracker.common.factory.IssueFactory;
import com.codesquad.issueTracker.common.factory.UserFactory;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.user.domain.User;

public class CommentTest {

    @DisplayName("커멘트 최초 생성 시 상태를 지정할 수 있다.")
    @Test
    void init_comment_status_assignable() {
        // given & when
        User user = UserFactory.mockSingleUser(1);
        Issue issue = IssueFactory.mockSingleIssue(1, user, null);
        Comment comment = new Comment("content1", null, user, issue, CommentStatus.INITIAL);

        // then
        assertThat(comment.getCommentStatus()).isEqualTo(CommentStatus.INITIAL);
    }
}
