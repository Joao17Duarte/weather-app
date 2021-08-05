import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faCloudRain, faCloudShowersHeavy, faSnowflake, faSun, faCloudSun, faSmog } from '@fortawesome/free-solid-svg-icons'


const {REACT_APP_OPENWEATHER_API_KEY} = process.env
const URL_API = "http://api.openweathermap.org/data/2.5/"
function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${URL_API}weather?q=${query}&units=metric&APPID=${REACT_APP_OPENWEATHER_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  let weatherIcons = {
    Thunderstorm: faBolt,
    Drizzle: faCloudRain,
    Rain: faCloudShowersHeavy,
    Snow: faSnowflake,
    Clear: faSun,
    Clouds: faCloudSun,
    Mist: faSmog,
  };

  return (
    
    <main>
      <div className="search-box">
        <input 
          type="text"
          className="search-bar"
          placeholder="Search a City..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>

      {(typeof weather.main != "undefined") ? (
      <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°c
          </div>
          <div className="weather">
            <div className="weather-icon">
              <FontAwesomeIcon icon={weatherIcons[weather.weather[0].main]}/>
            </div>

            <div className="weather-descript">
              {weather.weather[0].main}
            </div>
            
          </div>
        </div>
      </div>
      ) : ('')}
 
    </main>
  
);
}

export default App;
