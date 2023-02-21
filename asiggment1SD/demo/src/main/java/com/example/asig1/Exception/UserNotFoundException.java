package com.example.asig1.Exception;


import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserNotFoundException  extends RuntimeException{
    String message;
}
