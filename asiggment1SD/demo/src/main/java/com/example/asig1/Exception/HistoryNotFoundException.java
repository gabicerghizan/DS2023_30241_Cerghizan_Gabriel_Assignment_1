package com.example.asig1.Exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class HistoryNotFoundException extends RuntimeException{
    String message;
}
