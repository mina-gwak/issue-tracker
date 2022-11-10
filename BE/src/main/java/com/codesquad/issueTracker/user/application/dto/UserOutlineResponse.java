package com.codesquad.issueTracker.user.application.dto;

import java.util.Objects;

import com.codesquad.issueTracker.issue.application.dto.LabelCoverResponse;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserOutlineResponse {

    public static final UserOutlineResponse EMPTY_RESPONSE = new UserOutlineResponse();

    private String optionName;
    private String imageUrl;

    public UserOutlineResponse(String optionName, String imageUrl) {
        this.optionName = optionName;
        this.imageUrl = imageUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserOutlineResponse that = (UserOutlineResponse)o;
        return Objects.equals(getOptionName(), that.getOptionName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getOptionName());
    }
}
