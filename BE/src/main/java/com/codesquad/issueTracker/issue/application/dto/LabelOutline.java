package com.codesquad.issueTracker.issue.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LabelOutline {
    private String labelName;
    private String colorCode;
    private String textColor;
}
