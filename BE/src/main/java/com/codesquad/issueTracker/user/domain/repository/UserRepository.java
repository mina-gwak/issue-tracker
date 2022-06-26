package com.codesquad.issueTracker.user.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.codesquad.issueTracker.issue.application.dto.FilterOutlineResponse;
import com.codesquad.issueTracker.user.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String name);

    @Query("SELECT NEW com.codesquad.issueTracker.issue.application.dto.FilterOutlineResponse(u.name, u.image) "
        + "FROM User u")
    List<FilterOutlineResponse> findUserOutlineInfo();
}
