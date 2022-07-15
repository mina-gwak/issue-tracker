package com.codesquad.issueTracker.milestone.application.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class MilestonesResponse {
    private List<MilestoneSingleInfoResponse> milestoneSingleInfos;
    private int openMilestoneCount;
    private int closeMilestoneCount;

    public MilestonesResponse(List<MilestoneSingleInfoResponse> milestoneSingleInfos, int openMilestoneCount,
        int closeMilestoneCount) {
        this.milestoneSingleInfos = milestoneSingleInfos;
        this.openMilestoneCount = openMilestoneCount;
        this.closeMilestoneCount = closeMilestoneCount;
    }
}
