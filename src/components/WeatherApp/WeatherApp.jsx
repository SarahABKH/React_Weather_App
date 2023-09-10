import React from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import {useState} from "react";

const api={
  key:"9d8520ba2b7eaccff94d092b517d372f",
  base:"https://api.openweathermap.org/data/2.5/"
};


function WeatherApp () {
  const[search,setSearch]=useState("");

  const[weather,setWeather]=useState({});

  const searchPressed =()=>{
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
    .then((res)=>res.json())
    .then((result)=>{
    setWeather(result);
    }
    )
    console.log(weather)
  }

  function geticon () {
    const weather_condition =weather.weather[0].description.toLowerCase();
    if (weather_condition.includes("mist")){
      return drizzle_icon;
    }
    else if (weather_condition.includes("cloud")){
      return cloud_icon;
    }
    else if (weather_condition.includes("rain")){
      return rain_icon;
    }
    else{
      return clear_icon;
    }

  }

  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="cityInput" value ={search} placeholder='Enter City' onChange={(e)=>{setSearch(e.target.value)}}></input>
        <div className='search-icon' onClick={(e)=>{searchPressed(e.target.value)}}>
        <img src={search_icon} alt=""/>
        </div>
      </div>
      
      
      
      {Object.keys(weather).length>0 ?(
      
      
      <div>
        
        
        <div className='weather-image'>
          <img src={geticon()} alt=""/>
        </div>


      <div className="weather-temp">{weather.main.temp} &deg; C</div>
      <div className='weather-location'>{weather.name}</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt="" className='icon'/>
          <div className='data'>
            <div className='humidity-percent'>{weather.main.humidity}</div>
            <div className='text'>Humidity</div>


          </div>
        </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={wind_icon} alt="" className='icon'/>
          <div className='data'>
            <div className='humidity-percent'>{weather.wind.speed}</div>
            <div className='text'>Wind Speed</div>


          </div>
        </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          {/* <img src={wind_icon} alt="" className='icon'/> */}
          <div className='data'>
            <div className='humidity-percent'>{weather.weather[0].main}</div>
            <div className='text'></div>


          </div>
        </div>
      </div> </div>): <div className='default'>Weather App</div> }
      
    </div>
  )
}

export default WeatherApp
