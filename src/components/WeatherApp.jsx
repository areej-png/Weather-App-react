import { useState, useEffect } from 'react';
import './WeatherApp.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  
  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved){
      setRecentSearches(JSON.parse(saved));
    }
    // Default city load
    setCity('Islamabad');
    fetchWeatherForCity('Islamabad');
  }, []);

  const savedToRecentSearches = (cityName) => {
   const formattedCity = cityName.trim().charAt(0).toUpperCase() + cityName.trim().slice(1).toLowerCase();
  
  let updated = [formattedCity, ...recentSearches.filter(c => c.toLowerCase() !== formattedCity.toLowerCase())]; 
  updated = updated.slice(0, 5);

  setRecentSearches(updated);
  localStorage.setItem('recentSearches', JSON.stringify(updated));
}

  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  }

  const convertTemp = (temp) => {
    if (isCelsius) {
      return Math.round(temp);
    } else {
      return Math.round((temp * 9 / 5) + 32);
    }
  }

  const handleSearch = () => {
    fetchWeatherForCity(city);
  }

  const fetchWeatherForCity = async (cityName) => {
    if (!cityName.trim()) {
      setError("please enter a city name");
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        savedToRecentSearches(cityName);
      } else {
        setError(data.message || "City not found");
      }
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="weather-container">
      <div className="weather-box">
        <h1 className='heading'>Check the Weather</h1>
        <div className="search-section">
          <input 
            className='city-input'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter city name"
          />
          <button className='search-btn' onClick={handleSearch}>Search</button>
        </div>
        {/* ⬇️ Recent searches section */}
{recentSearches.length > 0 && (
  <div className="recent-searches">
    <p className="recent-label">Recent Searches:</p>
    <div className="recent-buttons">
      {recentSearches.map((recentCity, index) => (
        <button
          key={index}
          className="recent-btn"
          onClick={() => {
            setCity(recentCity);
            fetchWeatherForCity(recentCity);
          }}
        >
          {recentCity}
        </button>
      ))}
    </div>
  </div>
)}

        {!weatherData && !loading && !error && (
          <p>Search for a city</p>
        )}

        {loading && <p className='loading'>Loading...</p>}

        {error && <p className='error-msg'>{error}</p>}

        {weatherData && (
          <div className="weather-card">
            <h2>{weatherData.name}, {weatherData.sys?.country}</h2>

            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />

            <div className="temp-section">
              <p className='temperature'>
                {convertTemp(weatherData.main?.temp)}°{isCelsius ? 'C' : 'F'}
              </p>
              <button className='temp-toggle' onClick={toggleTemperature}>
                Switch to °{isCelsius ? 'F' : 'C'}
              </button>
            </div>

            <p className="description">{weatherData.weather[0].description}</p>

            <div className="weather-details">
              <p>Feels like: {convertTemp(weatherData.main?.feels_like)}°{isCelsius ? 'C' : 'F'}</p>
              <p>Humidity: {weatherData.main?.humidity}%</p>
              <p>Wind Speed: {weatherData.wind?.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default WeatherApp;