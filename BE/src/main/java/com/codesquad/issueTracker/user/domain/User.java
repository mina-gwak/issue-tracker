package com.codesquad.issueTracker.user.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @EqualsAndHashCode.Include
    private String name;
    private String nickname;
    private String image;

    public User(Long id, String name, String nickname, String image) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.image = image;
    }

    public User(String name, String nickname, String image) {
        this.name = name;
        this.nickname = nickname;
        this.image = image;
    }

    public boolean isYourId(Long userId) {
        return this.id.equals(userId);
    }
}
