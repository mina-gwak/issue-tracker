package com.codesquad.issueTracker.unit.issue.domain;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.codesquad.issueTracker.common.factory.IssueFactory;
import com.codesquad.issueTracker.common.factory.LabelFactory;
import com.codesquad.issueTracker.common.factory.MilestoneFactory;
import com.codesquad.issueTracker.common.factory.UserFactory;
import com.codesquad.issueTracker.issue.domain.AssignedIssue;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.label.domain.AttachedLabel;
import com.codesquad.issueTracker.label.domain.Label;
import com.codesquad.issueTracker.user.domain.User;

public class IssueTest {

    private Issue issue;

    @BeforeEach
    void setUp() {
        issue = IssueFactory.mockSingleIssue(0, UserFactory.mockSingleUserWithId(0),
            MilestoneFactory.mockSingleMilestone(0));
    }

    @DisplayName("userList를 받아 해당 이슈에 할당할 수 있다.")
    @Test
    void assign_user_this_issue() {
        // given
        List<User> users = UserFactory.mockMultipleUser(5);
        issue.assignUser(users);

        // when
        Set<AssignedIssue> assignedIssues = issue.getAssignedIssues();

        // then
        assertThat(assignedIssues.size()).isEqualTo(5);

        assertTrue(assignedIssues.stream()
            .map(AssignedIssue::getUser)
            .allMatch(users::contains));
    }

    @DisplayName("userId를 전달해서 해당 이슈가 자신에게 할당되었으면 true를 반환한다.")
    @Test
    void true_if_issue_assigned_this_user() {
        // given
        long userId = 1L;
        issue.assignUser(List.of(UserFactory.mockSingleUserWithId(userId)));

        // when
        boolean issueAssignedThisUser = issue.isAssignedThisUser(userId);

        // then
        assertTrue(issueAssignedThisUser);
    }

    @DisplayName("userId를 전달해서 해당 이슈가 자신에게 할당되지 않았다면 false를 반환한다.")
    @Test
    void false_if_issue_assigned_this_user() {
        // given
        long userId = 1L;
        issue.assignUser(List.of(UserFactory.mockSingleUserWithId(2L)));

        // when
        boolean issueAssignedThisUser = issue.isAssignedThisUser(userId);

        // then
        assertFalse(issueAssignedThisUser);
    }

    @DisplayName("라벨을 전달하면 issue에 할당된다.")
    @Test
    void attached_label() {
        // given
        List<Label> labels = LabelFactory.mockMultipleLabels(10);
        issue.attachedLabel(labels);

        // when
        Set<AttachedLabel> attachedLabels = issue.getAttachedLabels();

        // then
        assertThat(attachedLabels.size()).isEqualTo(10);

        assertTrue(attachedLabels.stream()
            .map(AttachedLabel::getLabel)
            .allMatch(labels::contains));
    }

    @DisplayName("assignee를 새로운 assignee List로 업데이트한다.")
    @Test
    void update_assignee_list() {
        // given
        List<User> oldUsers = List.of(UserFactory.mockSingleUserWithId(1L), UserFactory.mockSingleUserWithId(2L));
        issue.assignUser(oldUsers);

        // when
        List<User> updateUsers = List.of(UserFactory.mockSingleUserWithId(3L), UserFactory.mockSingleUserWithId(4L),
            UserFactory.mockSingleUserWithId(5L));

        issue.updateAssignee(updateUsers);

        // then
        Set<AssignedIssue> assignedIssues = issue.getAssignedIssues();

        assertThat(assignedIssues.size()).isEqualTo(3);

        assertTrue(assignedIssues.stream()
            .map(AssignedIssue::getUser)
            .noneMatch(oldUsers::contains));

        assertTrue(assignedIssues.stream()
            .map(AssignedIssue::getUser)
            .allMatch(updateUsers::contains));
    }

    @DisplayName("labels를 새로운 label List로 업데이트한다.")
    @Test
    void update_label_list() {
        // given
        List<Label> oldLabels = List.of(LabelFactory.mockSingleLabel(1), LabelFactory.mockSingleLabel(2));
        issue.attachedLabel(oldLabels);

        // when
        List<Label> updateLabelList = List.of(LabelFactory.mockSingleLabel(3), LabelFactory.mockSingleLabel(4), LabelFactory.mockSingleLabel(5));

        issue.updateLabels(updateLabelList);

        // then
        Set<AttachedLabel> attachedLabels = issue.getAttachedLabels();

        assertThat(attachedLabels.size()).isEqualTo(3);

        assertTrue(attachedLabels.stream()
            .map(AttachedLabel::getLabel)
            .noneMatch(oldLabels::contains));

        assertTrue(attachedLabels.stream()
            .map(AttachedLabel::getLabel)
            .allMatch(updateLabelList::contains));
    }
}
