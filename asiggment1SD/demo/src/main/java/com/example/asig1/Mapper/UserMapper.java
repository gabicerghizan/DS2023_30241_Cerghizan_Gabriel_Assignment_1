package com.example.asig1.Mapper;


import com.example.asig1.DTO.UserDTO;
import com.example.asig1.Model.User;

import java.util.ArrayList;
import java.util.List;

public class UserMapper {

    public static UserDTO toUserDTO(User user) {
        return new UserDTO(user.getId(), user.getFirstname(), user.getLastname(), user.getUsername(), user.getEmail(), user.getRoles());
    }

    public static List<UserDTO> toUserDTO(List<User> users) {
        List<UserDTO> userDTOS = new ArrayList<>();
        for (User user : users) {
            userDTOS.add(toUserDTO(user));
        }
        return userDTOS;
    }
}
