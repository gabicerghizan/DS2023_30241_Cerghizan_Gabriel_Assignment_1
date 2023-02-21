package com.example.asig1.Exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class DuplicateUserException extends RuntimeException{
    String message;
}
