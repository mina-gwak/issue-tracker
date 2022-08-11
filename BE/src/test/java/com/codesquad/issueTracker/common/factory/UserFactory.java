package com.codesquad.issueTracker.common.factory;

import java.util.ArrayList;
import java.util.List;

import com.codesquad.issueTracker.user.domain.User;

public class UserFactory {

    private UserFactory() {

    }

    public static User mockSingleUser(int num) {
        return new User("name" + num, "nick" + num, "image" + num);
    }

    public static User mockSingleUserWithId(long num) {
        return new User(num, "name" + num, "nick" + num, "image" + num);
    }

    public static List<User> mockMultipleUser(int count) {
        List<User> users = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            users.add(mockSingleUser(i));
        }
        return users;
    }
}
