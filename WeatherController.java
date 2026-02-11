package com.weather.app.controller;

import com.weather.app.model.WeatherRecord;
import com.weather.app.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*") // Allow CORS for frontend
public class WeatherController {
    
    @Autowired
    private WeatherService weatherService;
    
    // Save weather data
    @PostMapping("/save")
    public ResponseEntity<WeatherRecord> saveWeather(@RequestBody WeatherRecord record) {
        try {
            WeatherRecord savedRecord = weatherService.saveWeatherRecord(record);
            return new ResponseEntity<>(savedRecord, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Get all weather history
    @GetMapping("/history")
    public ResponseEntity<List<WeatherRecord>> getHistory() {
        try {
            List<WeatherRecord> records = weatherService.getAllRecords();
            if (records.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(records, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Get weather records by city
    @GetMapping("/city/{cityName}")
    public ResponseEntity<List<WeatherRecord>> getByCity(@PathVariable String cityName) {
        try {
            List<WeatherRecord> records = weatherService.getRecordsByCity(cityName);
            if (records.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(records, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Get weather records by condition
    @GetMapping("/condition/{condition}")
    public ResponseEntity<List<WeatherRecord>> getByCondition(@PathVariable String condition) {
        try {
            List<WeatherRecord> records = weatherService.getRecordsByCondition(condition);
            if (records.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(records, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Get record by ID
    @GetMapping("/{id}")
    public ResponseEntity<WeatherRecord> getById(@PathVariable Long id) {
        WeatherRecord record = weatherService.getRecordById(id);
        if (record != null) {
            return new ResponseEntity<>(record, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // Delete record
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRecord(@PathVariable Long id) {
        try {
            weatherService.deleteRecord(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Get total count
    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        try {
            long count = weatherService.getRecordCount();
            return new ResponseEntity<>(count, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
