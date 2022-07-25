package com.codesquad.issueTracker.common.factory;

import java.time.LocalDateTime;

import com.codesquad.issueTracker.milestone.domain.Milestone;

public class MilestoneFactory {

    private MilestoneFactory() {

    }

    public static Milestone mockSingleMilestone(int num) {
        return new Milestone("mileStoneName" + num, LocalDateTime.now(), "description" + num);
    }
}
