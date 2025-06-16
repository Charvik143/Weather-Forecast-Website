import React, { useState, useEffect } from 'react';
import { getForecast, getForecastByCoords } from './api';
import SearchBox from './components/SearchBox';
import ForecastCard from './components/ForecastCard';
import './styles.css';

const App = () => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const fetchByCity = async (city) => {
    try {
      const data = await getForecast(city);
      setForecast(data.list.filter((_, index) => index % 8 === 0)); // 5 days
      setError('');
    } catch (err) {
      setError('City not found. Please try again.');
    }
  };

  const fetchByLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await getForecastByCoords(latitude, longitude);
      setForecast(data.list.filter((_, index) => index % 8 === 0));
    });
  };

  useEffect(() => {
    fetchByLocation(); // Load by location on start
  }, []);

  return (
    <div className="App">
      <h1>Weather Forecast App</h1>
      <SearchBox onSearch={fetchByCity} />
      {error && <p>{error}</p>}
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <ForecastCard key={index} day={day} />
        ))}
      </div>
    </div>
  );
};

export default App;
