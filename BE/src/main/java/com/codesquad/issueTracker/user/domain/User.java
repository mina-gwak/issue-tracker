package com.codesquad.issueTracker.user.domain;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
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

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        User user = (User)o;
        return Objects.equals(getId(), user.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
