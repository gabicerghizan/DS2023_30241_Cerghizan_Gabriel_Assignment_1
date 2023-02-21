package com.example.asig1.Mapper;


import com.example.asig1.DTO.DeviceDTO;
import com.example.asig1.DTO.UserDTO;
import com.example.asig1.Model.Device;

public class DeviceMapper {
    public static DeviceDTO toDeviceDTO(Device device, UserDTO user){
        return new DeviceDTO(device.getId(), user.getUsername(), device.getLocation(), device.getMaximumMeasurement());
    }

    public static Device toDevice(DeviceDTO deviceDTO,Long userId){
        return new Device(deviceDTO.getId(), userId, deviceDTO.getLocation(), deviceDTO.getMaximumMeasurement());
    }
}
