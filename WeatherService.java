package com.weather.app.service;

import com.weather.app.model.WeatherRecord;
import com.weather.app.repository.WeatherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WeatherService {
    
    @Autowired
    private WeatherRepository weatherRepository;
    
    // Save weather record to database
    public WeatherRecord saveWeatherRecord(WeatherRecord record) {
        return weatherRepository.save(record);
    }
    
    // Get all weather records (history)
    public List<WeatherRecord> getAllRecords() {
        return weatherRepository.findAllByOrderByTimestampDesc();
    }
    
    // Get records by city name
    public List<WeatherRecord> getRecordsByCity(String cityName) {
        return weatherRepository.findByCityNameOrderByTimestampDesc(cityName);
    }
    
    // Get records by weather condition
    public List<WeatherRecord> getRecordsByCondition(String condition) {
        return weatherRepository.findByWeatherConditionOrderByTimestampDesc(condition);
    }
    
    // Get record by ID
    public WeatherRecord getRecordById(Long id) {
        return weatherRepository.findById(id).orElse(null);
    }
    
    // Delete record by ID
    public void deleteRecord(Long id) {
        weatherRepository.deleteById(id);
    }
    
    // Get total count of records
    public long getRecordCount() {
        return weatherRepository.count();
    }
}
