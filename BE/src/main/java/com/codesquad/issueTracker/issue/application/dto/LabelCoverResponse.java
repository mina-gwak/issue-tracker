package com.codesquad.issueTracker.issue.application.dto;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class LabelCoverResponse {

    private String labelName;
    private String labelColor;
    private String textColor;

    @QueryProjection
    public LabelCoverResponse(String labelName, String labelColor, String textColor) {
        this.labelName = labelName;
        this.labelColor = labelColor;
        this.textColor = textColor;
    }
}
