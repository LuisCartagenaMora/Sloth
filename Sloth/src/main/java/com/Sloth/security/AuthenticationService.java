// package com.Sloth.security;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.Sloth.model.User; // ✅ Your custom User entity
// import com.Sloth.repo.UserRepository;
// import com.Sloth.security.filters.JwtService;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class AuthenticationService {

//     private final UserRepository repository;
//     private final BCryptPasswordEncoder encoder;
//     private final JwtService jwtService;
//     private final AuthenticationManager authManager;

//     public AuthenticationResponse register(RegisterRequest request) {
//         var user = User.builder()
//                 .first_name(request.getFirstName())
//                 .last_name(request.getLastName())
//                 .username(request.getUserName())
//                 .password(encoder.encode(request.getPassword()))
//                 .build();
//         repository.save(user);

//         var jwtToken = jwtService.generateToken(user);
//         return AuthenticationResponse.builder().token(jwtToken).build();
//     }

//     public AuthenticationResponse authenticate(AuthenticationRequest request) {
//         authManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(
//                         request.getEmail(), request.getPassword()
//                 )
//         );

//         var user = repository.findByUsername(request.getEmail());
//         var jwtToken = jwtService.generateToken(user);
//         return AuthenticationResponse.builder().token(jwtToken).build();
//     }
// }

package com.Sloth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.Sloth.model.User;
import com.Sloth.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder encoder;
    private final JwtService jwtService;
    
    // Don't make it final to allow setter injection
    private AuthenticationManager authManager;

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authManager) {
        this.authManager = authManager;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .first_name(request.getFirstName())
                .last_name(request.getLastName())
                .username(request.getUserName())
                .password(encoder.encode(request.getPassword()))
                .build();
        repository.save(user);

        var jwtToken = jwtService.generateToken(user);
        System.out.println("Generated token: " + jwtToken);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUserName(), request.getPassword()
                )
        );

        var user = repository.findByUsername(request.getUserName());
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}

