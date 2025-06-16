import React from 'react';

const ForecastCard = ({ day }) => {
  const { dt_txt, main, weather } = day;

  return (
    <div className="forecast-card">
      <h4>{dt_txt.split(' ')[0]}</h4>
      <p>{weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
        alt="icon"
      />
      <p>Temp: {main.temp}°C</p>
    </div>
  );
};

export default ForecastCard;
