package com.example.asig1.Controller;

import com.example.asig1.Model.History;
import com.example.asig1.Service.DeviceService;
import com.example.asig1.Service.HistoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE}, maxAge=180)
@AllArgsConstructor
@RequestMapping(path = "/api/history")
public class HistoryController {
    private HistoryService historyService;
    private DeviceService deviceService;

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody History history){
        try {
            this.deviceService.getById(history.getDeviceId());
            this.historyService.historyAlreadyExists(history);
            this.historyService.add(history);

            return ResponseEntity.ok().body("History added successfully");
        } catch (Exception e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> get(@PathVariable Long id){
        try {
            History history = this.historyService.getById(id);

            return ResponseEntity.ok().body(history);
        } catch (Exception e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody History history){
        try {
            this.historyService.getById(id);
            this.historyService.update(history);

            return ResponseEntity.ok().body("History updated successfully.");
        } catch (Exception e) {

            return new ResponseEntity<>("History not updated", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            History history = this.historyService.getById(id);
            this.historyService.delete(history);

            return ResponseEntity.ok().body("History deleted successfully.");
        } catch (Exception e) {

            return new ResponseEntity<>("History not found.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/device/{id}")
    public ResponseEntity<?> getAllByDeviceId(@PathVariable Long id, @RequestParam String date)
    {
        date = date + "%";

        return ResponseEntity.ok(this.historyService.getAllByDeviceIdAndDate(id, date));
    }
}

