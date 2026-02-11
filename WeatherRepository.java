package com.weather.app.repository;

import com.weather.app.model.WeatherRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WeatherRepository extends JpaRepository<WeatherRecord, Long> {
    
    // Find all records ordered by timestamp descending (newest first)
    List<WeatherRecord> findAllByOrderByTimestampDesc();
    
    // Find records by city name
    List<WeatherRecord> findByCityNameOrderByTimestampDesc(String cityName);
    
    // Find records by weather condition
    List<WeatherRecord> findByWeatherConditionOrderByTimestampDesc(String weatherCondition);
}
