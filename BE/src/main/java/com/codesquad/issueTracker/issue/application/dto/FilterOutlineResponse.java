package com.codesquad.issueTracker.issue.application.dto;

import lombok.Getter;

@Getter
public class FilterOutlineResponse {
    private String name;
    private String image;

    public FilterOutlineResponse(String name) {
        this(name, "NO IMAGE");
    }

    public FilterOutlineResponse(String name, String image) {
        this.name = name;
        this.image = image;
    }
}
