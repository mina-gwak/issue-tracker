package com.codesquad.issueTracker.authentication.infrastructure.dto;

import com.codesquad.issueTracker.authentication.application.dto.UserProfileResponse;
import com.codesquad.issueTracker.user.domain.User;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {

    @JsonProperty("login")
    private String name;

    @JsonProperty("name")
    private String nickname;

    @JsonProperty("avatar_url")
    private String image;

    public User toEntity() {
        return new User(name, nickname, image);
    }

    public UserProfileResponse toDto() {
        return new UserProfileResponse(name, nickname, image);
    }
}
