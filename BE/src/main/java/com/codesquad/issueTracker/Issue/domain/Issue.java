package com.codesquad.issueTracker.Issue.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.codesquad.issueTracker.Comment.domain.Comment;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private boolean isOpened;
    private LocalDateTime writtenTime;
    private LocalDateTime modificationTime;

    @OneToMany(mappedBy = "issue")
    private List<Comment> comments = new ArrayList<>();

    public Issue(String title, String content, LocalDateTime writtenTime,
        LocalDateTime modificationTime) {
        this.title = title;
        this.content = content;
        this.isOpened = true;
        this.writtenTime = writtenTime;
        this.modificationTime = modificationTime;
    }
}
