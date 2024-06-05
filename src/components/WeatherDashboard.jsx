import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import Header from './Header';
import Footer from './Footer';
import CitySearch from './CitySearch';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Bangalore');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}&units=metric`);
        setWeatherData(response.data);
        setError(null);
      } catch (err) {
        setError('City not found');
      }
    };
    fetchWeather();
  }, [city]);

  const weatherType = weatherData ? weatherData.weather[0].main.toLowerCase() : 'default';
  const bgClass = weatherType === 'clear' ? 'bg-summer' :
                  weatherType === 'rain' ? 'bg-rainy' :
                  weatherType === 'snow' ? 'bg-winter' :
                  weatherType === 'drizzle' ? 'bg-drizzle' :
                  weatherType === 'thunderstorm' ? 'bg-thunderstorm' :
                  weatherType === 'clouds' ? 'bg-cloudy' : 'bg-default';

  return (
    <div className={`min-h-screen flex flex-col ${bgClass} transition-all duration-500`}>
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <CitySearch setCity={setCity} />
          {error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            weatherData && <WeatherCard weatherData={weatherData} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WeatherDashboard;
