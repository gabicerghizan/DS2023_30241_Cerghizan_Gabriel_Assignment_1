package com.example.asig1.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter

public class DeviceDTO {
    private Long id;
    private String username;
    private String location;
    private float maximumMeasurement;
}
