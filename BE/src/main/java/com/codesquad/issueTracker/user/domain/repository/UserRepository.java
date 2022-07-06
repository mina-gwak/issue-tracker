package com.codesquad.issueTracker.user.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.codesquad.issueTracker.user.application.dto.UserOutlineResponse;
import com.codesquad.issueTracker.user.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String name);

    @Query("SELECT NEW com.codesquad.issueTracker.user.application.dto.UserOutlineResponse(u.name, u.image) "
        + "FROM User u ORDER BY u.name")
    List<UserOutlineResponse> findUserOutlineInfo();

    List<User> findByNameIn(List<String> assignees);

    @Query("SELECT NEW com.codesquad.issueTracker.user.application.dto.UserOutlineResponse(u.name, u.image) "
        + "FROM User u WHERE u.id in :userId")
    List<UserOutlineResponse> findByIds(@Param("userId") List<Long> userId);
}
