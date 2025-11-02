import { useState } from 'react';
import './WeatherApp.css';
function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const handleSearch = () => {
    fetchWeather();
  }
  // Phase 3
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("please enter a city name");
      return;
    }

    //states reset
    setLoading(true);
    setError('');
    setWeatherData(null);

    //API call
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

      console.log("Checking API URL:", url);

      const response = await fetch(url);
      const data = await response.json();

      // Check response
      if (response.ok) {
        setWeatherData(data);
        console.log("Weather data:", data);
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
          {/* Phase 2 step 1*/}
          <input className='city-input'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="Enter city name"
          />
          <button className='search-btn' onClick={handleSearch}>Search</button>
        </div>
        {/*Phase 2 step 2 */}
        {!weatherData && !loading && !error && (
          <p>Search for a city</p>
        )}

        {loading && <p className='loading'>Loading...</p>}

        {error && <p className='error-msg'>{error}</p>}

        {weatherData && (
          <div className="weather-card">
            {/*Phase 4 step 1 city name & country */}
            <h2>{weatherData.name}, {weatherData.sys?.country}</h2>

            {/* {Weather icon} */}
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />

            {/* {Temperature} */}
            <p className='temperature'>{Math.round(weatherData.main?.temp)}°C</p>

            {/* {Description} */}
            <p className="description">{weatherData.weather[0].description}</p>

            {/* {Additional details} */}
            <div className="weather-details">
              <p>Feels like: {Math.round(weatherData.main?.feels_like)}°C</p>
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