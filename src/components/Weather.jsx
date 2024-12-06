import React, { useEffect,useRef,useState } from "react";
import "./Weather.css";

import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
    const [weatherData , setWeatherData] = useState(false)
    const weatherRef = useRef(null)
   
    const search =  async(city) => {
        try {
            if (city==='') {
                alert('Please enter a City name')
                return
            }
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`
            const response = await fetch(url)
           

            const data = await response.json()
            if (!response.ok) {
              alert(data.message)
              return
          }
            console.log(data)
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
           setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                location: data.name,
                temperature: Math.floor(data.main.temp),
                icon:iconUrl,
                description: data.weather[0].description  // Add the weather description  
            })

        } catch (error) {
            console.error(error)
        }
    }  
    useEffect(() =>{
        search("Nairobi")
    },[])
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={weatherRef} type="text" placeholder="Enter a city name..." />
        <img src={search_icon} alt="" onClick={() => search(weatherRef.current.value)}/>
      </div>
      {weatherData ? <>
        <div className="interface">
        <img src={weatherData.icon} alt="" />
        <p>{weatherData.temperature}°C</p>
        <p>{weatherData.location}</p>
        <p>{weatherData.description}</p>
      </div>
      <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{weatherData.humidity}%</p>
                <span>
                     Humidity
                </span>
            </div>
            
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherData.wind} Km/hr</p>
                <span>
                     Wind speed
                </span>
            </div>
            
        </div>
      </div></>:<></>}
    </div>
  );
};

export default Weather;
