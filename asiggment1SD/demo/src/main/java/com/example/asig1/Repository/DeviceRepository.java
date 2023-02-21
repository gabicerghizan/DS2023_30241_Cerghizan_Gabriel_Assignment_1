package com.example.asig1.Repository;

import com.example.asig1.Model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeviceRepository extends JpaRepository<Device,Long> {
    @Query(value="SELECT * FROM device WHERE user_id= ?1",nativeQuery = true)
    List<Device> findAllByUserId(Long id);

    @Query(value="SELECT * FROM device LIMIT 10 OFFSET ?1",nativeQuery = true)
    List<Device> findAllByOffset(int offset);

    @Modifying
    @Query(value="DELETE FROM device WHERE user_id= ?1",nativeQuery = true)
    void deleteAllByUserID(Long Id);




}
