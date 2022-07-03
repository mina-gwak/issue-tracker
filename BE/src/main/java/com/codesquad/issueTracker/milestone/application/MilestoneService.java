package com.codesquad.issueTracker.milestone.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.milestone.domain.MilestoneRepository;
import com.codesquad.issueTracker.milestone.application.dto.MilestoneOutlineResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;

    @Transactional(readOnly = true)
    public List<MilestoneOutlineResponse> findMilestonesOutlineInfo() {
        return milestoneRepository.findMilestonesOutlineInfo();
    }
}
