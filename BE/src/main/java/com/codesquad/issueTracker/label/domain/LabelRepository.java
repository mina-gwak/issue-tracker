package com.codesquad.issueTracker.label.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.codesquad.issueTracker.label.application.dto.LabelOutlineResponse;

public interface LabelRepository extends JpaRepository<Label, Long> {

    @Query("SELECT NEW com.codesquad.issueTracker.label.application.dto.LabelOutlineResponse(l.name, l.labelColor) "
        + "FROM Label l")
    List<LabelOutlineResponse> findLabelsOutlineInfo();

    List<Label> findByNameIn(List<String> labels);
}
