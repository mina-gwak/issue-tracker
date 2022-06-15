package com.codesquad.issueTracker.authentication.infrastructure.dto;

import com.codesquad.issueTracker.User.domain.User;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse {

    @JsonProperty("login")
    private String name;

    @JsonProperty("avatar_url")
    private String image;

    public User toEntity() {
        return new User(name, image);
    }
}
