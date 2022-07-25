package com.codesquad.issueTracker.common.factory;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.milestone.domain.Milestone;
import com.codesquad.issueTracker.user.domain.User;

public class IssueFactory {

    private IssueFactory() {

    }
    public static List<Issue> mockIssueList(List<User> users, List<Milestone> milestones) {
        List<Issue> list = new ArrayList<>();
        for (int i = 0; i < users.size(); i++) {
            list.add(new Issue("title" + i, "contents" + i, LocalDateTime.now(), LocalDateTime.now(),
                users.get(i), milestones.get(i)));
        }
        return list;
    }
}
