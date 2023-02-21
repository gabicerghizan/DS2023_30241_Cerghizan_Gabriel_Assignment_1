package com.example.asig1.Repository;

import com.example.asig1.Model.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface HistoryRepository extends JpaRepository<History,Long> {
    History findByDateAndDeviceId(Date date,Long id);
    List<History> findAllByDeviceId(Long Id);

    @Query(value = "SELECT * FROM history WHERE device_id = ?1 AND history.date LIKE ?2", nativeQuery = true)
    List<History> findAllByDeviceIdAndDate(Long id, String date);
}
