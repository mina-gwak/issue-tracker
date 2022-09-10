package com.codesquad.issueTracker.unit.milestone.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.codesquad.issueTracker.common.factory.MilestoneFactory;
import com.codesquad.issueTracker.exception.milestone.MilestoneNotFoundException;
import com.codesquad.issueTracker.milestone.application.MilestoneService;
import com.codesquad.issueTracker.milestone.application.dto.MilestoneOutlineResponse;
import com.codesquad.issueTracker.milestone.application.dto.MilestoneSingleInfoResponse;
import com.codesquad.issueTracker.milestone.application.dto.MilestonesResponse;
import com.codesquad.issueTracker.milestone.domain.Milestone;
import com.codesquad.issueTracker.milestone.domain.MilestoneRepository;
import com.codesquad.issueTracker.milestone.presentation.dto.MilestoneContentRequest;

@ExtendWith(MockitoExtension.class)
class MilestoneServiceTest {

    @InjectMocks
    private MilestoneService milestoneService;

    @Mock
    private MilestoneRepository milestoneRepository;

    @DisplayName("마일스톤 Outline 정보 list를 가져온다.")
    @Test
    void show_milestone_outline_info() {
        // given
        int MILESTONE_COUNT = 10;
        List<Milestone> milestones = MilestoneFactory.mockMultipleMilestone(MILESTONE_COUNT);

        List<MilestoneOutlineResponse> milestoneOutlineResponses = milestones.stream()
            .map(milestone -> new MilestoneOutlineResponse(milestone.getName()))
            .collect(Collectors.toList());

        given(milestoneRepository.findMilestonesOutlineInfo())
            .willReturn(milestoneOutlineResponses);

        // when
        List<MilestoneOutlineResponse> responses = milestoneService.findMilestonesOutlineInfo();

        // then
        assertThat(responses).hasSize(MILESTONE_COUNT).hasSameElementsAs(milestoneOutlineResponses);
    }

    @DisplayName("open된 마일스톤을 가져온다.")
    @Test
    void show_open_milestone() {
        // given
        long ALL_COUNT = 5;
        List<Milestone> milestones = List.of(
            MilestoneFactory.mockSingleMilestoneWithId(1L),
            MilestoneFactory.mockSingleMilestoneWithId(2L));

        List<MilestoneSingleInfoResponse> resultList = milestones.stream()
            .map(MilestoneSingleInfoResponse::new)
            .collect(Collectors.toList());

        given(milestoneRepository.count())
            .willReturn(ALL_COUNT);

        given(milestoneRepository.findByIsOpenedTrue())
            .willReturn(milestones);

        // when
        MilestonesResponse response = milestoneService.findMilestones("true");

        // then
        assertThat(response.getMilestoneSingleInfos()).hasSize(resultList.size()).hasSameElementsAs(resultList);
        assertThat(response.getOpenMilestoneCount()).isEqualTo(resultList.size());
        assertThat(response.getCloseMilestoneCount()).isEqualTo(ALL_COUNT - resultList.size());
        verify(milestoneRepository, times(1))
            .findByIsOpenedTrue();
    }

    @DisplayName("close된 마일스톤을 가져온다.")
    @Test
    void show_close_milestone() {
        // given
        long ALL_COUNT = 5;
        List<Milestone> milestones = List.of(
            MilestoneFactory.mockSingleMilestoneWithId(1L),
            MilestoneFactory.mockSingleMilestoneWithId(2L));

        List<MilestoneSingleInfoResponse> resultList = milestones.stream()
            .map(MilestoneSingleInfoResponse::new)
            .collect(Collectors.toList());

        given(milestoneRepository.count())
            .willReturn(ALL_COUNT);

        given(milestoneRepository.findByIsOpenedFalse())
            .willReturn(milestones);

        // when
        MilestonesResponse response = milestoneService.findMilestones("false");

        // then
        assertThat(response.getMilestoneSingleInfos()).hasSize(resultList.size()).hasSameElementsAs(resultList);
        assertThat(response.getOpenMilestoneCount()).isEqualTo(ALL_COUNT - resultList.size());
        assertThat(response.getCloseMilestoneCount()).isEqualTo(resultList.size());
        verify(milestoneRepository, times(1))
            .findByIsOpenedFalse();
    }

    @DisplayName("마일스톤을 생성한다.")
    @Test
    void create_milestone() {
        // given
        MilestoneContentRequest request = new MilestoneContentRequest("milestone1", null, "desc1");

        // when
        milestoneService.createMilestone(request);

        // then
        verify(milestoneRepository, times(1))
            .save(any(Milestone.class));
    }

    @DisplayName("존재하는 마일스톤을 수정한다.")
    @Test
    void edit_milestone() {
        // given
        long MILESTONE_ID = 1L;
        Milestone milestone = MilestoneFactory.mockSingleMilestoneWithId(MILESTONE_ID);
        given(milestoneRepository.findById(MILESTONE_ID))
            .willReturn(Optional.of(milestone));

        MilestoneContentRequest request = new MilestoneContentRequest("changedName", null,
            "changed_discription");

        // when
        milestoneService.editMilestone(MILESTONE_ID, request);

        // then
        assertThat(milestone.getName()).isEqualTo("changedName");
        assertThat(milestone.getDescription()).isEqualTo("changed_discription");
    }

    @DisplayName("존재하지 않는 마일스톤일 경우 MilestoneNotFoundException이 발생한다.")
    @Test
    void exception_occur_when_milestone_not_exist() {
        // given
        long NOT_EXIST_ID = 1L;
        given(milestoneRepository.findById(NOT_EXIST_ID))
            .willReturn(Optional.empty());

        MilestoneContentRequest request = new MilestoneContentRequest("changedName", null,
            "changed_discription");

        // when & then
        assertThatThrownBy(() -> {
            milestoneService.editMilestone(NOT_EXIST_ID, request);
        }).isInstanceOf(MilestoneNotFoundException.class);
    }

    @DisplayName("존재하는 마일스톤의 상태를 close한다.")
    @Test
    void close_milestone() {
        // given
        long MILESTONE_ID = 1L;
        Milestone milestone = MilestoneFactory.mockSingleMilestoneWithId(MILESTONE_ID);
        given(milestoneRepository.findById(MILESTONE_ID))
            .willReturn(Optional.of(milestone));

        // when
        milestoneService.changeStatus(MILESTONE_ID, "false");

        // then
        assertThat(milestone.isOpened()).isFalse();
    }

    @DisplayName("존재하지 않는 마일스톤의 open/close 변경을 시도할 경우 MilestoneNotFoundException이 발생한다.")
    @Test
    void exception_occur_when_milestone_not_exist_and_try_open_or_close() {
        // given
        long NOT_EXIST_ID = 1L;
        given(milestoneRepository.findById(NOT_EXIST_ID))
            .willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> {
            milestoneService.changeStatus(NOT_EXIST_ID, "false");
        }).isInstanceOf(MilestoneNotFoundException.class);
    }

    @DisplayName("존재하는 마일스톤을 제거할 수 있다.")
    @Test
    void delete_milestone() {
        // given
        long MILESTONE_ID = 1L;
        Milestone milestone = MilestoneFactory.mockSingleMilestoneWithId(MILESTONE_ID);

        given(milestoneRepository.findById(MILESTONE_ID))
            .willReturn(Optional.of(milestone));

        // when
        milestoneService.deleteMilestones(MILESTONE_ID);

        // then
        verify(milestoneRepository, times(1))
            .deleteById(MILESTONE_ID);
    }

    @DisplayName("존재하지 않는 마일스톤 제거를 시도하면 MilestoneNotFoundException이 발생한다.")
    @Test
    void can_not_delete_not_exist_milestone() {
        // given
        long NOT_EXIST_ID = 1L;

        given(milestoneRepository.findById(NOT_EXIST_ID))
            .willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> {
            milestoneService.deleteMilestones(NOT_EXIST_ID);
        }).isInstanceOf(MilestoneNotFoundException.class);
    }

}
