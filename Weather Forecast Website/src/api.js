import axios from 'axios';

const API_KEY = 'f155f877a67d334234b6aecb896fcb48HERE'; // Replace with your OpenWeatherMap API Key

export const getForecast = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast`,
    {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    }
  );
  return response.data;
};

export const getForecastByCoords = async (lat, lon) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast`,
    {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    }
  );
  return response.data;
};
