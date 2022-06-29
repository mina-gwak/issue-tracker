package com.codesquad.issueTracker.label.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.codesquad.issueTracker.issue.application.dto.FilterOutlineResponse;

public interface LabelRepository extends JpaRepository<Label, Long> {

    @Query("SELECT NEW com.codesquad.issueTracker.issue.application.dto.FilterOutlineResponse(l.name, l.labelColor) "
        + "FROM Label l")
    List<FilterOutlineResponse> findLabelsOutlineInfo();

    List<Label> findByNameIn(List<String> labels);
}
