package com.codesquad.issueTracker.common.factory;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.codesquad.issueTracker.milestone.domain.Milestone;

public class MilestoneFactory {

    private MilestoneFactory() {

    }

    public static Milestone mockSingleMilestone(int num) {
        return new Milestone("mileStoneName" + num, LocalDateTime.now(), "description" + num);
    }

    public static List<Milestone> mockMultipleMilestone(int count) {
        List<Milestone> milestones = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            milestones.add(mockSingleMilestone(i));
        }
        return milestones;
    }
}
