package com.hoxify.backend.entity;

import com.hoxify.backend.annotation.UniqueUsername;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@ToString
@Data
@NoArgsConstructor
@Entity
@Table
public class User {

    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private long id;

    @NotNull(message ="{hoxify.constraints.username.NotNull.message}" )
    @Size(min = 4, max = 100)
    @UniqueUsername
    private String username;

    @NotNull
    @Size(min = 4, max = 100)
    private String displayName;

    @NotNull
    @Size(min = 8, max = 100)
    @Pattern(regexp =  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{hoxify.constraint.password.Pattern.message}")
    private String password;
}
