package com.example.asig1.Controller;

import com.example.asig1.DTO.UserDTO;
import com.example.asig1.Exception.DuplicateUserException;
import com.example.asig1.Exception.UserNotFoundException;
import com.example.asig1.Mapper.UserMapper;
import com.example.asig1.Model.Role;
import com.example.asig1.Model.User;
import com.example.asig1.Service.DeviceService;
import com.example.asig1.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE}, maxAge=180)
@AllArgsConstructor
@RequestMapping(path = "/api/user")
public class UserController {

    private UserService userService;
    private DeviceService deviceService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        try {
            UserDTO user = this.userService.getUserById(id);

            return ResponseEntity.ok(user);
        } catch (Exception e) {

            return ResponseEntity.badRequest().body("Invalid id");
        }
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UserDTO user) {
        try {
            this.userService.getUserById(id);
            this.userService.updateUserInfo(id, user);

            return ResponseEntity.ok("User updated");
        } catch (UserNotFoundException e) {

            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        } catch (DuplicateUserException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            this.userService.getUserById(id);
            this.userService.deleteUser(id);
            this.deviceService.deleteDevicesByUserId(id);

            return ResponseEntity.ok().body("User deleted");
        } catch (UserNotFoundException e) {

            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/getAll")
    public ResponseEntity<?> getAll() {
        List<User> users = this.userService.getAllUsers();

        return new ResponseEntity<>(UserMapper.toUserDTO(users), HttpStatus.ACCEPTED);
    }

    @PostMapping(path = "/{id}/addRole")
    public ResponseEntity<?> addRoleToUser(@PathVariable Long id, @RequestBody Role role) {
        try {
            UserDTO user = this.userService.getUserById(id);
            this.userService.addRoleToUser(user.getUsername(), role.getName());

            return ResponseEntity.ok().body("Role added successfully");
        } catch (Exception e) {

            return new ResponseEntity<>("Invalid id.", HttpStatus.BAD_REQUEST);
        }
    }
}
