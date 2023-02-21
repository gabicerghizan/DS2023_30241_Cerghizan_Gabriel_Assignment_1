package com.example.asig1.Service;

import com.example.asig1.Exception.HistoryNotFoundException;
import com.example.asig1.Model.History;
import com.example.asig1.Repository.HistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.management.BadAttributeValueExpException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor

public class HistoryService {
    private final HistoryRepository historyRepository;

    public void add(History history){
        this.historyRepository.save(history);
    }

    public History getById(Long id){
        Optional<History> history=this.historyRepository.findById(id);
        if(history.isEmpty()){
            throw new HistoryNotFoundException("History does not exists");
        }
        return history.get();
    }

    public void delete(History history){
        this.historyRepository.delete(history);
    }

    public void update(History history) {
        History databaseHistory = this.getById(history.getId());
        databaseHistory.setDeviceId(history.getDeviceId());
        databaseHistory.setMeasurement(history.getMeasurement());
        databaseHistory.setDate(history.getDate());

        this.historyRepository.flush();
    }

    public void historyAlreadyExists(History history) throws BadAttributeValueExpException {

        if (this.historyRepository.findByDateAndDeviceId(history.getDate(), history.getDeviceId()) != null) {
            throw new BadAttributeValueExpException("Duplicate date and device id combination.");
        }
    }

    public List<History> getAllByDeviceId(Long id) {
        return this.historyRepository.findAllByDeviceId(id);
    }

    public List<History> getAllByDeviceIdAndDate(Long id, String date) {

        return this.historyRepository.findAllByDeviceIdAndDate(id,date);
    }
}

