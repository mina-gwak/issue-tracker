package com.codesquad.issueTracker.issue.application.dto;

import java.util.Objects;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LabelCoverResponse {

    private String labelName;
    private String labelColor;
    private String textColor;

    public static final LabelCoverResponse EMPTY_RESPONSE = new LabelCoverResponse();

    public LabelCoverResponse(String labelName, String labelColor, String textColor) {
        this.labelName = labelName;
        this.labelColor = labelColor;
        this.textColor = textColor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        LabelCoverResponse that = (LabelCoverResponse)o;
        return Objects.equals(getLabelName(), that.getLabelName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getLabelName());
    }
}
