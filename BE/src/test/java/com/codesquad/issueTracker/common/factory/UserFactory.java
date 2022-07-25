package com.codesquad.issueTracker.common.factory;

import com.codesquad.issueTracker.user.domain.User;

public class UserFactory {

    private UserFactory() {

    }

    public static User mockSingleUser(int num) {
        return new User("name" + num, "nick" + num, "image" + num);
    }
}
