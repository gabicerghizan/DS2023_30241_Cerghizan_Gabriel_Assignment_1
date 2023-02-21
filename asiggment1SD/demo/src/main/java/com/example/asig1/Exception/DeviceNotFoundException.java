package com.example.asig1.Exception;


import lombok.AllArgsConstructor;

@AllArgsConstructor
public class DeviceNotFoundException extends RuntimeException{
    String message;
}
