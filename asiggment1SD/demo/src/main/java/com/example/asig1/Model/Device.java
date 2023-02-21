package com.example.asig1.Model;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "device")
public class Device {
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "device_sequence"
    )
    @SequenceGenerator(
            name = "device_sequence",
            sequenceName = "device_sequence",
            allocationSize = 1
    )

    @Column(name = "id", nullable = false)

    private Long id;
    private Long userId;
    private String location;
    private float maximumMeasurement;
}


