package com.example.asig1.Controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.asig1.DTO.DeviceDTO;
import com.example.asig1.DTO.UserDTO;
import com.example.asig1.Exception.UserNotFoundException;
import com.example.asig1.Mapper.DeviceMapper;
import com.example.asig1.Model.Device;
import com.example.asig1.Service.DeviceService;
import com.example.asig1.Service.SecurityService;
import com.example.asig1.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE}, maxAge=1800)
@RestController
@RequestMapping(path = "/api/device")
@AllArgsConstructor
public class DeviceController {
    private DeviceService deviceService;
    private UserService userService;
    private SecurityService securityService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        try {
            Device device = this.deviceService.getById(id);
            UserDTO user = this.userService.getUserById(device.getUserId());

            return ResponseEntity.ok().body(DeviceMapper.toDeviceDTO(device, user));
        } catch (Exception e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody DeviceDTO deviceDto) {
        try {
            UserDTO user = this.userService.getUserByUsername(deviceDto.getUsername());
            Device device = DeviceMapper.toDevice(deviceDto, user.getId());
            this.deviceService.add(device);

            return ResponseEntity.ok().body("Device added successfully.");
        } catch (UserNotFoundException e) {

            return new ResponseEntity<>("Invalid user id", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody DeviceDTO device) {
        try {
            this.deviceService.getById(id);
            UserDTO userDto = this.userService.getUserByUsername(device.getUsername());
            this.deviceService.update(DeviceMapper.toDevice(device, userDto.getId()));

            return ResponseEntity.ok().body("Device updated successfully");
        } catch (UserNotFoundException e) {

            return new ResponseEntity<>("Invalid user id", HttpStatus.NOT_FOUND);
        } catch (Exception e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            Device device = this.deviceService.getById(id);
            this.deviceService.delete(device);

            return ResponseEntity.ok().body("Device deleted successfully");
        } catch (Exception e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @GetMapping(path = "/user")
    public ResponseEntity<?> getDevicesByUserToken(@RequestHeader("Authorization") String token){
        DecodedJWT decodedJWT = this.securityService.decodedJWT(token);
        String[] roles = this.securityService.extractRolesFromToken(decodedJWT);
        String username = this.securityService.extractUsernameFromToken(decodedJWT);
        try {
            if (this.userService.userHasRights(username, roles)) {
                UserDTO user = this.userService.getUserByUsername(username);
                List<Device> devices = this.deviceService.getAllByUserId(user.getId());
                List<DeviceDTO> deviceDtos = new ArrayList<>();

                for (Device device: devices) {
                    deviceDtos.add(DeviceMapper.toDeviceDTO(device, user));
                }

                return ResponseEntity.ok().body(deviceDtos);
            }
        } catch (Exception e) {

            return new ResponseEntity<>("Bad request!", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Access denied!", HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = "/getAll")
    public ResponseEntity<?> getAll(){
        List<Device> devices = this.deviceService.getAll();
        List<DeviceDTO> deviceDtos = new ArrayList<>();
        for (Device device: devices) {
            UserDTO user = this.userService.getUserById(device.getUserId());

            deviceDtos.add(DeviceMapper.toDeviceDTO(device, user));
        }

        return ResponseEntity.ok(deviceDtos);
    }
}
