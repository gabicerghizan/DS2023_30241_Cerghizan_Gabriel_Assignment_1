package com.example.asig1.Model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="history")

public class History {
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "history_sequence"
    )
    @SequenceGenerator(
            name = "history_sequence",
            sequenceName = "history_sequence",
            allocationSize = 1
    )

    @Column(name = "id", nullable = false)

    private Long id;
    private Long deviceId;
    private float measurement;
    private Date date;
}
