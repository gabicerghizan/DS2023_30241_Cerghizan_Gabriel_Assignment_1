package com.example.asig1.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class MeasurementDTO {
    private Long id;
    private String date;
    private float measurement;

}
