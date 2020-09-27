package com.hoxify.backend.api;

import com.hoxify.backend.entity.User;
import com.hoxify.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/1.0")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @PostMapping("/users")
    public void createUser(@RequestBody User user)
    {
        userService.save(user);

        log.info(user.toString());
    }
}
