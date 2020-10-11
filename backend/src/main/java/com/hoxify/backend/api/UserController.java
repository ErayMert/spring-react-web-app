package com.hoxify.backend.api;

import com.hoxify.backend.entity.User;
import com.hoxify.backend.error.ApiError;
import com.hoxify.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/1.0")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user)
    {
        return ResponseEntity.ok(userService.save(user));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleValidationException(MethodArgumentNotValidException exception){
        ApiError apiError = new ApiError(400,"Validation Error", "/api/1.0/users");
        Map<String,String> validationErros = new HashMap<>();
        for(FieldError fieldError : exception.getBindingResult().getFieldErrors()){
            validationErros.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        apiError.setValidationErrors(validationErros);
        return apiError;
    }
}
