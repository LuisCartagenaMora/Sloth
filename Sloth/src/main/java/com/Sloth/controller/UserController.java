package com.Sloth.controller;
import com.Sloth.model.User;
import com.Sloth.model.UserService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/{userId}")
    public User getUser(@PathVariable Long userId) {
        return userService.getUserInfo(userId);
    }

    @GetMapping("/get-user/{userName}")
    public UserDetails fetchUserByUserName(@PathVariable String userName){
        return userService.getUserByUsername(userName);
    }

    @GetMapping("/verification/{userName}-{password}")
    public Map<String, Boolean> passwordVerification(@PathVariable String userName, @PathVariable String password){
        boolean result = userService.checkPassword(userName, password);
        Map<String, Boolean> response = new HashMap<>();
        response.put("status", result); // or false based on logic
        return response;
    }

    @PostMapping("/new-user")
    public void newUser(@RequestBody User user){
        userService.createUser(user);
        System.out.println("Successfully created new user...");
    }

    @PutMapping("/add-budget")
    public void changeBudget(@RequestParam Long userId, @RequestParam double budget){
        userService.changeUserBudget(userId, budget);
    }

}
