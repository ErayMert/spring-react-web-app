package com.hoxify.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@ToString
@Data
@NoArgsConstructor
@Entity
@Table
public class User {

    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private long id;
    private String username;
    private String displayName;
    private String password;
}
