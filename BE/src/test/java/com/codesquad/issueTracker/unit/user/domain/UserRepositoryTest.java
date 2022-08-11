package com.codesquad.issueTracker.unit.user.domain;

import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;
import com.codesquad.issueTracker.user.domain.User;
import com.codesquad.issueTracker.user.domain.repository.UserRepository;

@ActiveProfiles("test")
@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestEntityManager testEntityManager;

    private List<User> users = new ArrayList<>();

    @BeforeEach
    void setUp() {
        User user1 = new User("user1", "nickname1", "image1");
        User user2 = new User("user2", "nickname2", "image2");
        User user3 = new User("user3", "nickname3", "image3");

        users.add(user1);
        users.add(user2);
        users.add(user3);

        userRepository.saveAll(users);

        testEntityManager.flush();
        testEntityManager.clear();
    }

    @AfterEach
    void tearDown() {
        testEntityManager.getEntityManager()
            .createNativeQuery("ALTER TABLE user ALTER COLUMN id RESTART WITH 1")
            .executeUpdate();
    }

    @DisplayName("유저 이름으로 유저를 조회한다.")
    @Test
    void find_user_by_valid_name() {
        User user = userRepository.findByName("user1")
            .orElseThrow();

        assertThat(user).isEqualTo(users.get(0));
        assertThat(user.getId()).isEqualTo(1L);
    }

    @DisplayName("등록되지 않은 유저 이름으로 유저를 조회할 수 없다.")
    @Test
    void unable_to_find_user_by_invalid_name() {
        assertThat(userRepository.findByName("user4")).isEmpty();
    }

    @DisplayName("전체 유저의 Outline 정보를 조회한다.")
    @Test
    void find_all_users_outline_info() {
        List<UserOutlineResponse> info = userRepository.findUserOutlineInfo();

        assertThat(info.size()).isEqualTo(3);
        assertThat(info.get(1).getOptionName()).isEqualTo("user2");
        assertThat(info.get(1).getImageUrl()).isEqualTo("image2");
    }

    @DisplayName("assignee 목록에 있는 유저를 조회한다.")
    @Test
    void find_user_in_assignee_list() {
        List<String> assignees = List.of("user1", "user3");
        List<User> users = userRepository.findByNameIn(assignees);

        assertThat(users.size()).isEqualTo(2);
        assertThat(users.get(1).getName()).isEqualTo("user3");
    }

    @DisplayName("id 목록에 있는 유저 Outline을 조회한다.")
    @Test
    void find_user_in_id_lists() {
        List<Long> userIds = List.of(2L, 3L);
        List<UserOutlineResponse> outlineResponses = userRepository.findByIds(userIds);

        assertThat(outlineResponses.size()).isEqualTo(2);
        assertThat(outlineResponses.get(0).getOptionName()).isEqualTo("user2");
    }
}
