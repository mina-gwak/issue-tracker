package com.codesquad.issueTracker.issue.application.dto;

import java.time.LocalDateTime;

import com.codesquad.issueTracker.issue.domain.Issue;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PopUpResponse {

    private String title;
    private String content;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime writtenTime;
    private boolean assignedMe;

    public PopUpResponse(Issue issue, boolean assigned) {
        this.title = issue.getTitle();
        this.writtenTime = issue.getWrittenTime();
        this.assignedMe = assigned;
        this.content = issue.getContent();
        if (this.content.length() > 50) {
            this.content = this.content.substring(0, 50) + "...";
        }
    }
}
