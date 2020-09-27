package com.hoxify.backend.service;

import com.hoxify.backend.entity.User;
import com.hoxify.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    PasswordEncoder passwordEncode;

    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
        this.passwordEncode = new BCryptPasswordEncoder();
    }

    public User save(User user) {
        user.setPassword(this.passwordEncode.encode(user.getPassword()));
       return  userRepository.save(user);
    }
}
