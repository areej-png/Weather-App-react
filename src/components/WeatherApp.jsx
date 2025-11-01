import { useState } from 'react';
function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 
  const handleSearch = () => {
  }
 return ( 
  <div className="weather">
     {/* Phase 2 step 1*/}
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter city name"
    />
    <button onClick={handleSearch}>Search</button>
    {/*Phase 2step 2 */}
    {/*case 1 Weather Data checked */}
    {!weatherData && !loading && !error && (
      <p>Search for a city</p>
    )}

    {/* Case 2: Loading state */}
    {loading && <p>Loading...</p>}

    {/* Case 3: Error state */}
    {error && <p style={{color: 'red'}}>{error}</p>}

    {/* Case 4: Weather data display */}
    {weatherData && (
      <div className="weather-card">
        <h2>{weatherData.name}</h2>
        <p>Temperature: {weatherData.main?.temp}°C</p>
      </div>
    )}

  </div>
  
); 
}
export default WeatherApp;