package com.codesquad.issueTracker.issue.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.codesquad.issueTracker.label.domain.Label;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class AttachedLabel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "labelId")
    private Label label;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issueId")
    private Issue issue;

    public AttachedLabel(Label label, Issue issue) {
        this.label = label;
        this.issue = issue;
    }

    public String getLabelName() {
        return label.getName();
    }

    public String getLabelColor() {
        return label.getLabelColor();
    }

    public String getTextColor() {
        return label.getTextColor();
    }
}
