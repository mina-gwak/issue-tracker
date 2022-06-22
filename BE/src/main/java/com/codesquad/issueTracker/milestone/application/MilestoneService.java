package com.codesquad.issueTracker.milestone.application;

import java.util.List;

import org.springframework.stereotype.Service;

import com.codesquad.issueTracker.issue.application.dto.FilterOutlineResponse;
import com.codesquad.issueTracker.milestone.domain.MilestoneRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;

    public List<FilterOutlineResponse> findMilestonesOutlineInfo() {
        return milestoneRepository.findMilestonesOutlineInfo();
    }
}
