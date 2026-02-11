-- MySQL Database Setup Script for Weather Prediction Application
-- Author: Weather App Team
-- Date: 2026

-- Create Database
CREATE DATABASE IF NOT EXISTS weather_db;

-- Use the database
USE weather_db;

-- Create weather_records table
CREATE TABLE IF NOT EXISTS weather_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(100) NOT NULL,
    country VARCHAR(100),
    temperature DOUBLE,
    description VARCHAR(255),
    humidity INT,
    wind_speed DOUBLE,
    pressure INT,
    weather_condition VARCHAR(50),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_city_name (city_name),
    INDEX idx_timestamp (timestamp),
    INDEX idx_weather_condition (weather_condition)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create a view for recent weather searches
CREATE OR REPLACE VIEW recent_weather_searches AS
SELECT 
    id,
    city_name,
    country,
    temperature,
    description,
    humidity,
    wind_speed,
    pressure,
    weather_condition,
    timestamp
FROM weather_records
ORDER BY timestamp DESC
LIMIT 50;

-- Create a view for weather statistics by city
CREATE OR REPLACE VIEW weather_stats_by_city AS
SELECT 
    city_name,
    COUNT(*) as search_count,
    AVG(temperature) as avg_temperature,
    MAX(temperature) as max_temperature,
    MIN(temperature) as min_temperature,
    AVG(humidity) as avg_humidity,
    MAX(timestamp) as last_searched
FROM weather_records
GROUP BY city_name
ORDER BY search_count DESC;

-- Insert some sample data (optional)
INSERT INTO weather_records 
(city_name, country, temperature, description, humidity, wind_speed, pressure, weather_condition) 
VALUES 
('Kakinada', 'IN', 28.5, 'clear sky', 65, 3.5, 1013, 'Clear'),
('Hyderabad', 'IN', 32.0, 'scattered clouds', 55, 4.2, 1011, 'Clouds'),
('Mumbai', 'IN', 30.5, 'light rain', 80, 5.1, 1009, 'Rain');

-- Show table structure
DESCRIBE weather_records;

-- Show sample data
SELECT * FROM weather_records ORDER BY timestamp DESC LIMIT 10;

-- Show statistics
SELECT * FROM weather_stats_by_city;

-- Grant privileges (update username/password as needed)
-- GRANT ALL PRIVILEGES ON weather_db.* TO 'root'@'localhost';
-- FLUSH PRIVILEGES;

-- Display success message
SELECT 'Database setup completed successfully!' as Status;
