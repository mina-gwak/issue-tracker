package com.codesquad.issueTracker.label.application.dto;

import com.codesquad.issueTracker.label.domain.Label;

import lombok.Getter;

@Getter
public class LabelDetails {
    private Long id;
    private String name;
    private String description;
    private String colorCode;
    private String textColor;

    public LabelDetails(Label label) {
        this.id = label.getId();
        this.name = label.getName();
        this.description = label.getDescription();
        this.colorCode = label.getLabelColor();
        this.textColor = label.getTextColor();
    }
}
