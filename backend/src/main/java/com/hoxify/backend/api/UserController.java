package com.hoxify.backend.api;

import com.hoxify.backend.entity.User;
import com.hoxify.backend.error.ApiError;
import com.hoxify.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/1.0")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user)
    {
        String username = user.getUsername();
        String displayName = user.getDisplayName();

        ApiError apiError = new ApiError(400,"Validation Error", "/api/1.0/users");
        Map<String,String> validationErros = new HashMap<>();
        if(username == null || username.isEmpty()){

            validationErros.put("username", "Username cannot be null");
        }

        if(displayName == null || displayName.isEmpty()){

            validationErros.put("displayName", "Display name cannot be null");
        }

        if(validationErros.size()>0){
            apiError.setValidationErrors(validationErros);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
        }

        return ResponseEntity.ok(userService.save(user));
    }
}
