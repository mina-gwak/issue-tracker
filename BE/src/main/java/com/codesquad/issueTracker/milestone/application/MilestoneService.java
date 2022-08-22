package com.codesquad.issueTracker.milestone.application;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.issueTracker.exception.milestone.MilestoneNotFoundException;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.milestone.application.dto.MilestoneSingleInfoResponse;
import com.codesquad.issueTracker.milestone.application.dto.MilestonesResponse;
import com.codesquad.issueTracker.milestone.domain.Milestone;
import com.codesquad.issueTracker.milestone.domain.MilestoneRepository;
import com.codesquad.issueTracker.milestone.application.dto.MilestoneOutlineResponse;
import com.codesquad.issueTracker.milestone.presentation.dto.MilestoneContentRequest;

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

    @Transactional
    public void createMilestone(MilestoneContentRequest request) {
        Milestone milestone = request.toEntity();
        milestoneRepository.save(milestone);
    }

    @Transactional
    public void editMilestone(Long milestoneId, MilestoneContentRequest request) {
        Milestone milestone = findSingleMilestone(milestoneId);
        milestone.update(request.getName(), request.getDescription(), request.getDueDate());
    }

    @Transactional
    public void changeStatus(Long milestoneId, String open) {
        boolean isOpened = Boolean.parseBoolean(open);
        Milestone milestone = findSingleMilestone(milestoneId);
        milestone.changeOpenOrClose(isOpened);
    }

    @Transactional
    public void deleteLabels(Long milestoneId) {
        Milestone milestone = findSingleMilestone(milestoneId);
        List<Issue> issues = milestone.getIssues();
        for (Issue issue : issues) {
            issue.removeMilestone();
        }
        milestoneRepository.deleteById(milestoneId);
    }

    private Milestone findSingleMilestone(Long milestoneId) {
        return milestoneRepository.findById(milestoneId)
            .orElseThrow(MilestoneNotFoundException::new);
    }

}
