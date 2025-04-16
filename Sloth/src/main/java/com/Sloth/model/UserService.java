package com.Sloth.model;

import com.Sloth.repo.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public UserDetails getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    //Creates a user.
    public void createUser(User newUser){
        User user = new User(null, newUser.getFirst_name(), newUser.getLast_name(), newUser.getUsername(), newUser.getPassword(), newUser.getBudget());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public User getUserInfo(Long userId){
        return userRepository.getUserInfoByUserId(userId);
    }

    public void changeUserBudget(Long userId, double budget){
        userRepository.changeBudgetForUserId(userId, budget);
    }

    //Get a single by their id.
    public Optional<User> getUserById(long id){
        return userRepository.findById(id);
    }

    public boolean checkPassword(String userName, String password){
        UserDetails user = getUserByUsername(userName);
        return passwordEncoder.matches(password, user.getPassword());
    }
}
