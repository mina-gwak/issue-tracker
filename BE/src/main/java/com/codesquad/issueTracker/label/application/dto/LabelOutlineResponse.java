package com.codesquad.issueTracker.label.application.dto;

import lombok.Getter;

@Getter
public class LabelOutlineResponse {
    private String name;
    private String colorCode;

    public LabelOutlineResponse(String name, String colorCode) {
        this.name = name;
        this.colorCode = colorCode;
    }
}
