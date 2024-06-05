import React from 'react';

const WeatherCard = ({ weatherData }) => {
  const { name, main, weather, wind, visibility } = weatherData;
  const weatherType = weather[0].main.toLowerCase();
  const bgClass = weatherType === 'clear' ? 'bg-summer' :
                  weatherType === 'rain' ? 'bg-rainy' :
                  weatherType === 'snow' ? 'bg-winter' :
                  weatherType === 'drizzle' ? 'bg-drizzle' :
                  weatherType === 'thunderstorm' ? 'bg-thunderstorm' :
                  weatherType === 'clouds' ? 'bg-cloudy' : 'bg-default';

  return (
    <div className={`p-6 rounded-lg shadow-lg text-center ${bgClass}`}>
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-xl">{main.temp}°C</p>
      <p className="text-md">{weather[0].description}</p>
      <p className="text-sm">Humidity: {main.humidity}%</p>
      <p className="text-sm">Visibility: {visibility / 1000} km</p>
      <p className="text-sm">Wind Speed: {wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
