package com.example.asig1.Service;


import com.example.asig1.Exception.DeviceNotFoundException;
import com.example.asig1.Model.Device;
import com.example.asig1.Repository.DeviceRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class DeviceService {
    private final DeviceRepository deviceRepository;

    public void add(Device device) {
        this.deviceRepository.save(device);
    }

    public void delete(Device device) {
        this.deviceRepository.delete(device);
    }

    public Device getById(Long id) {
        Optional<Device> device = this.deviceRepository.findById(id);
        if (device.isEmpty()) {
            throw new DeviceNotFoundException("The id for this device does not exist");
        }
        return device.get();
    }

    public void update(Device device) {
        Device databaseDevice = this.deviceRepository.findById(device.getId()).get();
        databaseDevice.setUserId(device.getUserId());
        databaseDevice.setLocation(device.getLocation());

        this.deviceRepository.flush();
    }

    public List<Device> getAllByUserId(Long id) {
        return this.deviceRepository.findAllByUserId(id);
    }

    public List<Device> getAll() {
        return this.deviceRepository.findAll();
    }

    public void deleteDevicesByUserId(Long id){
        System.out.println(id);
        this.deviceRepository.deleteAllByUserID(id);
    }
}
