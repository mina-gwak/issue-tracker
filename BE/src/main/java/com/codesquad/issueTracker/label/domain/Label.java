package com.codesquad.issueTracker.label.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Label {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String labelColor;
    private String textColor;

    public Label(String name, String description, String labelColor, String textColor) {
        this.name = name;
        this.description = description;
        this.labelColor = labelColor;
        this.textColor = textColor;
    }
}
