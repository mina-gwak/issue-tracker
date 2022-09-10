package com.codesquad.issueTracker.unit.label.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import com.codesquad.issueTracker.common.factory.LabelFactory;
import com.codesquad.issueTracker.exception.label.LabelNotFoundException;
import com.codesquad.issueTracker.issue.domain.Issue;
import com.codesquad.issueTracker.label.application.LabelService;
import com.codesquad.issueTracker.label.application.dto.LabelDetails;
import com.codesquad.issueTracker.label.application.dto.LabelListResponse;
import com.codesquad.issueTracker.label.application.dto.LabelOutlineResponse;
import com.codesquad.issueTracker.label.domain.Label;
import com.codesquad.issueTracker.label.domain.LabelRepository;
import com.codesquad.issueTracker.label.presentation.dto.LabelAddRequest;

@ExtendWith(MockitoExtension.class)
public class LabelServiceTest {

    @InjectMocks
    private LabelService labelService;

    @Mock
    private LabelRepository labelRepository;

    @DisplayName("labelRequest를 전달받아 저장한다.")
    @Test
    void save_label() {
        // given
        LabelAddRequest request = new LabelAddRequest("label1", "라벨1 입니다.", "blaco", "white");
        Label label = request.toEntity();

        // when
        labelService.addLabels(request);

        // then
        verify(labelRepository, times(1))
            .save(label);
    }

    @DisplayName("라벨 Outline 정보 list를 가져온다.")
    @Test
    void show_label_outline_info() {
        // given
        int LABEL_COUNT = 10;
        List<Label> labels = LabelFactory.mockMultipleLabels(LABEL_COUNT);
        List<LabelOutlineResponse> outlineResponses = labels.stream()
            .map(label -> new LabelOutlineResponse(label.getName(), label.getLabelColor()))
            .collect(Collectors.toList());

        given(labelRepository.findLabelsOutlineInfo())
            .willReturn(outlineResponses);

        // when
        List<LabelOutlineResponse> responses = labelService.findLabelsOutlineInfo();

        // then
        assertThat(responses).hasSize(LABEL_COUNT).hasSameElementsAs(outlineResponses);
    }

    @DisplayName("라벨 상세 리스트를 가져온다.")
    @Test
    void show_detail_label_list() {
        // given
        int LABEL_COUNT = 10;
        List<Label> labels = new ArrayList<>();
        for (int i = 1; i <= LABEL_COUNT; i++) {
            labels.add(LabelFactory.mockSingleLabelWithId(i));
        }

        List<LabelDetails> labelDetails = labels.stream()
            .map(LabelDetails::new)
            .collect(Collectors.toList());

        given(labelRepository.findAll(any(Sort.class)))
            .willReturn(labels);

        // when
        LabelListResponse response = labelService.findLabelsList();

        // then
        assertThat(response.getLabelCount()).isEqualTo(LABEL_COUNT);
        assertThat(response.getLabelDetails()).hasSize(LABEL_COUNT).hasSameElementsAs(labelDetails);
    }

    @DisplayName("존재하는 라벨을 수정할 수 있다.")
    @Test
    void editable_if_label_exist() {
        // given
        Label label = LabelFactory.mockSingleLabelWithId(1);
        LabelAddRequest request = new LabelAddRequest("changedName", "changed description", "cColor",
            "ctColor");

        given(labelRepository.findById(label.getId()))
            .willReturn(Optional.of(label));

        // when
        labelService.editLabels(label.getId(), request);

        // then
        verify(labelRepository, times(1))
            .findById(label.getId());

        assertThat(label.getName()).isEqualTo("changedName");
        assertThat(label.getDescription()).isEqualTo("changed description");
        assertThat(label.getLabelColor()).isEqualTo("cColor");
        assertThat(label.getTextColor()).isEqualTo("ctColor");
    }

    @DisplayName("존재하지 않는 라벨을 수정하려면 LabelNotFoundException이 발생한다.")
    @Test
    void not_editable_if_label_not_exist() {
        // given
        Label label = LabelFactory.mockSingleLabelWithId(1);
        LabelAddRequest request = new LabelAddRequest("changedName", "changed description", "cColor",
            "ctColor");

        given(labelRepository.findById(label.getId()))
            .willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() ->
            labelService.editLabels(label.getId(), request)).isInstanceOf(LabelNotFoundException.class);

        verify(labelRepository, times(1))
            .findById(label.getId());
    }

    @DisplayName("라벨을 삭제한다.")
    @Test
    void delete_label() {
        // when & then
        labelService.deleteLabels(1L);

        verify(labelRepository, times(1))
            .deleteById(1L);
    }

}
