package com.Sloth.repo;

import com.Sloth.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;


public interface UserRepository extends JpaRepository<User, Long> {

    //Returns the budget for the current user.
    @Query(nativeQuery = true, value="SELECT * FROM users WHERE user_id = :userId")
    User getUserInfoByUserId(Long userId);
    //Changes the user's budget based on what w
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value="UPDATE users SET budget= :budget WHERE user_id= :userId")
    void changeBudgetForUserId(Long userId, double budget);
    UserDetails findByUsername(String username);
}
