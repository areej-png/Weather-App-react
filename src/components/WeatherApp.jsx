import { useState } from 'react';
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
    if (!city.trim()){
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
    <div className="weather">
      {/* Phase 2 step 1*/}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key ==='Enter'){
            handleSearch();
          }
        }}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      
      {/*Phase 2 step 2 */}
      {!weatherData && !loading && !error && (
        <p>Search for a city</p>
      )}

      {loading && <p>Loading...</p>}

      {error && <p style={{color: 'red'}}>{error}</p>}

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