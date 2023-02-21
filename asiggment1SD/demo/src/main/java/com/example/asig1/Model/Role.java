package com.example.asig1.Model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "role_sequence"
    )
    @SequenceGenerator(
            name = "role_sequence",
            sequenceName = "role_sequence",
            allocationSize = 1
    )

    @Column(name = "id", nullable = false)

    private Long id;
    private String name;

    public Long getId() {
        return id;
    }

    ;

    public void setId(Long id) {
        this.id = id;
    }

    ;
}
