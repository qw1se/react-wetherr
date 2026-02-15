import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = "5d44c8cb9a9e2d710e993a8839e93d21";

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [theme, setTheme] = useState('day');
  const [loading, setLoading] = useState(false);

  
  const getThemeByCityTime = (timezoneOffset) => {
    
    const now = new Date();
    
    
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (timezoneOffset * 1000));
    
    const cityHour = cityTime.getHours();
    
    return cityHour >= 6 && cityHour < 18 ? 'day' : 'night';
  };

  
  const searchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error('Город не найден');
      }
      
      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();
      
      setWeather(weatherData);
      setForecast(forecastData);
      
      
      const newTheme = getThemeByCityTime(weatherData.timezone);
      setTheme(newTheme);
      
    } catch (error) {
      alert('Город не найден или ошибка сети');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (!weather) return;
    
    const updateTheme = () => {
      const newTheme = getThemeByCityTime(weather.timezone);
      setTheme(newTheme);
    };
    
    
    const interval = setInterval(updateTheme, 60000);
    
    return () => clearInterval(interval);
  }, [weather]);

  const getWeatherIcon = (iconCode) => 
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}:00`;
  };

  const formatDay = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className={`app-container ${theme}-theme`}>
      <div className="background-stars"></div>
      
      <div className="app">
        <div className="search-box">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Введите город..."
            onKeyPress={(e) => e.key === 'Enter' && searchWeather()}
          />
          <button onClick={searchWeather} disabled={loading}>
            {loading ? '...' : '🔍'}
          </button>
        </div>

        {weather && (
          <div className="main-info">
            <h1 className="city-name">{weather.name}</h1>
            <div className="temperature">
              {Math.round(weather.main.temp)}°
            </div>
            <div className="condition-box">
              <span className="description">{weather.weather[0].description}</span>
              <img 
                src={getWeatherIcon(weather.weather[0].icon)} 
                alt="weather" 
                className="main-icon"
              />
            </div>
            <div className="high-low">
              H:{Math.round(weather.main.temp_max)}° L:{Math.round(weather.main.temp_min)}°
            </div>
          </div>
        )}

        {forecast && (
          <>
            <div className="glass-card">
              <div className="card-header">Почасовой прогноз</div>
              <div className="hourly-list">
                {forecast.list.slice(0, 8).map((hour, idx) => (
                  <div key={idx} className="hour-item">
                    <span className="hour-time">{formatTime(hour.dt)}</span>
                    <img src={getWeatherIcon(hour.weather[0].icon)} alt="weather" />
                    <span className="hour-temp">{Math.round(hour.main.temp)}°</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card">
              <div className="card-header">Прогноз на неделю</div>
              <div className="week-list">
                {forecast.list.filter((item, idx) => idx % 8 === 0).slice(0, 5).map((day, idx) => (
                  <div key={idx} className="day-row">
                    <span>{formatDay(day.dt)}</span>
                    <img src={getWeatherIcon(day.weather[0].icon)} alt="weather" />
                    <div className="temp-bar-container">
                      <span className="temp-val">{Math.round(day.main.temp_min)}°</span>
                      <div className="bar-track">
                        <div 
                          className="bar-fill" 
                          style={{ 
                            width: `${Math.min(100, ((day.main.temp_max - day.main.temp_min) / 20) * 100)}%` 
                          }}
                        ></div>
                      </div>
                      <span className="temp-val">{Math.round(day.main.temp_max)}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
