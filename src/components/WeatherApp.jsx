import { useState } from 'react';
function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

 console.log(city);
 console.log(API_KEY);
  return (
    <div className="weather">
      {/*UI structure*/}
    </div>
  );
}
export default WeatherApp;