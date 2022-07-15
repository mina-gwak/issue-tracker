package com.codesquad.issueTracker.milestone.application;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.milestone.application.dto.MilestoneSingleInfoResponse;
import com.codesquad.issueTracker.milestone.application.dto.MilestonesResponse;
import com.codesquad.issueTracker.milestone.domain.Milestone;
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

    @Transactional(readOnly = true)
    public MilestonesResponse findMilestones(String open) {
        boolean isOpened = Boolean.parseBoolean(open);
        long milestoneCount = milestoneRepository.count();

        if(isOpened) {
            List<MilestoneSingleInfoResponse> openList = milestoneRepository.findByIsOpenedTrue().stream()
                .map(MilestoneSingleInfoResponse::new)
                .collect(Collectors.toList());
            return new MilestonesResponse(openList, openList.size(), (int) milestoneCount - openList.size());
        }
        List<MilestoneSingleInfoResponse> closeList = milestoneRepository.findByIsOpenedFalse().stream()
            .map(MilestoneSingleInfoResponse::new)
            .collect(Collectors.toList());
        return new MilestonesResponse(closeList, closeList.size(), (int)milestoneCount - closeList.size());
    }
}
