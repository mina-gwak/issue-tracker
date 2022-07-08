package com.codesquad.issueTracker.label.presentation.dto;

import com.codesquad.issueTracker.label.domain.Label;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LabelAddRequest {
    private String name;
    private String description;
    private String colorCode;
    private String textColor;

    public LabelAddRequest(String name, String description, String colorCode, String textColor) {
        this.name = name;
        this.description = description;
        this.colorCode = colorCode;
        this.textColor = textColor;
    }

    public Label toEntity() {
        return new Label(name, description, colorCode, textColor);
    }
}
