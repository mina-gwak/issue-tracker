package com.codesquad.issueTracker.label.application.dto;

import lombok.Getter;

@Getter
public class LabelOutlineResponse {
    private String optionName;
    private String colorCode;

    public LabelOutlineResponse(String optionName, String colorCode) {
        this.optionName = optionName;
        this.colorCode = colorCode;
    }
}
