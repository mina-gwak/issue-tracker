package com.codesquad.issueTracker.label.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
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

    public Label(Long id, String name, String description, String labelColor, String textColor) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.labelColor = labelColor;
        this.textColor = textColor;
    }

    public Label(String name, String description, String labelColor, String textColor) {
        this.name = name;
        this.description = description;
        this.labelColor = labelColor;
        this.textColor = textColor;
    }

    public void updateContents(String name, String description, String colorCode, String textColor) {
        this.name = name;
        this.description = description;
        this.labelColor = colorCode;
        this.textColor = textColor;
    }
}
