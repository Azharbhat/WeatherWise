import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { RiCelsiusFill } from "react-icons/ri";
import { BsSunrise } from "react-icons/bs";
import { FiSunset } from "react-icons/fi";
import { FaTemperatureLow } from "react-icons/fa6";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import {WiDayCloudy,WiNightAltCloudy,WiDayCloudyWindy
  ,WiNightAltCloudyGusts,WiDayFog ,WiNightCloudyWindy
  ,WiDayShowers,WiNightAltShowers,WiDayRain ,WiNightAltRain
   ,WiDayThunderstorm ,WiNightThunderstorm,WiDaySnow,WiNightSnow
   ,WiDayCloudyGusts,WiBarometer, WiNightClear,WiDaySunny,} 
   from "weather-icons-react";
function App() {
  const [weatherData, setWeatherData] = useState('Handwara');
  const [search,setSearch]=useState('')
  const [city, setCity] = useState('');
  const [long, setLong] = useState(null);
  const [lati, setLati] = useState(null);
  const [error, setError] = useState(null);
  //data 
  const [sunrise,setSunrise]=useState('');
  const [sunset,setSunset]=useState('');
  const [iconn,setIconn]=useState('');
  const [min_temp,setMintemp]=useState("");
  const [max_temp,setMaxtemp]=useState("");
  const [pressure,setPressure]=useState("");
  const [humidity,setHumidity]=useState("")
  const[main,setMain]=useState('')
  const[temp,setTemp]=useState('')
  const [name,setName]=useState('')
  const [lt,setLt]=useState('')
  const [lon,setLon]=useState('')
  const [deg,setdeg]=useState('')
  const [speed,setspeed]=useState('')
  const exclude = "daily";


  //handle temperature
  

  const convertToFahrenheitToCelsius = (f) => {
    return (f - 32) * (5 / 9);
  };


  const apiKey = "c6e1bc76d0575dab31695f7802df87a3"
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl;

        if (city.length>0) {
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        } else if (lati && long) {
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${apiKey}`;
        } else {
          console.error('Invalid request. Provide a city or geolocation.');
          return;
        }

        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
        setSunrise(formatUnixTimestamp(response.data.sys.sunrise))
        setSunset(formatUnixTimestamp(response.data.sys.sunset))
        setIconn(response.data.weather[0].icon)
        setMain(response.data.weather[0].main)
        setMintemp((response.data.main.temp_min-273.15).toFixed(2))
        setMaxtemp((response.data.main.temp_max-273.15).toFixed(2))
        setPressure(response.data.main.pressure)
        setHumidity(response.data.main.humidity)
        setTemp(((response.data.main.temp)-273.15).toFixed(2))
        setLt(response.data.coord.lat)
        setLon(response.data.coord.lon)
        setspeed(response.data.wind.speed)
        setdeg(response.data.wind.deg)
      //  setTemp(convertToFahrenheitToCelsius(temp))
        setName(response.data.name)
        
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    };
    fetchData();
  }, [city, lati, long]);
  console.log(weatherData)
  //get geolocation
 
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLong( longitude);
          setLati(latitude);
        },
        (error) => {
          setError(`Error getting location: ${error.message}`);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []); 
  const cityy = ()=>{
  setCity()
  }
 // console.log(location)
//time
const formatUnixTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);
  return `${hours}:${minutes}:${seconds}`;
};
  return (
    <div className="App">
   
   
      <div className="top">
        <div className="tleft">
       
        <h1 style={{color:'rgbrgb(87, 87, 161)'}}>WeatherWise</h1>
          <div className="tleftt">
           <div  className='sub-tleft'><h1>{name}</h1> <br></br><input type="text" placeholder="Enter place"  onChange={(e) => setCity(e.target.value)} /></div>
          <h1>
  {
    (() => {
      switch (iconn) {
        case '01d':
          return <div><WiDaySunny className="wicon"/></div>;
        case '01n':
          return <div><WiNightClear className="wicon"/></div>;
        case '02d':
          return <div><WiDayCloudy className="wicon"/></div>;
        case '02n':
          return <div><WiNightAltCloudy className="wicon"/></div>;
        case '03d':
          return <div><WiDayCloudyWindy className="wicon"/>          </div>;
        case '03n':
          return <div><WiNightAltCloudyGusts className="wicon" /></div>;
        case '04d':
          return <div><WiDayFog  className="wicon"/></div>;
        case '04n':
          return <div><WiNightCloudyWindy className="wicon" /></div>;
        case '09d':
          return <div><WiDayShowers  className="wicon"/></div>;
        case '09n':
          return <div><WiNightAltShowers  className="wicon"/></div>;
        case '10d':
          return <div><WiDayRain className="wicon"/></div>;
        case '10n':
          return <div><WiNightAltRain className="wicon"/></div>;
        case '11d':
          return <div><WiDayThunderstorm className="wicon"/></div>;
        case '11n':
          return <div><WiNightThunderstorm  className="wicon"/></div>;
        case '13d':
          return <div><WiDaySnow  className="wicon"/></div>;
        case '13n':
          return <div><WiNightSnow  className="wicon"/></div>;
        case '50d':
          return <div><WiDayCloudyGusts  className="wicon"/></div>;
        case '50n':
          return <div><WiNightAltCloudyGusts className="wicon"/></div>;
        default:
          return <div>Unknown weather condition</div>;
      }
    })()
  }
</h1>
            <div className='sub-tleft'>
              <h1>{temp}<RiCelsiusFill /></h1>
              <h3>{main}</h3>
            </div>
          </div>
        </div>
        <div className="tright">
          <ul className="ul">
            <li className="li"><h2>{max_temp}<RiCelsiusFill /></h2><FaTemperatureHigh style={{height:35,width:40}}/><p>High</p></li>
            <li><h2>{sunrise}</h2><BsSunrise style={{height:40,width:40}}/><p>Sunrise</p></li>
            <li><h2>{humidity}</h2><WiHumidity style={{height:40,width:40}}/><p>Humidity</p></li>
          </ul>
          <ul className="ul">
            <li><h2>{min_temp}<RiCelsiusFill /></h2><FaTemperatureLow style={{height:35,width:40}}/><p>low</p></li>
            <li><h2>{sunset}</h2><FiSunset style={{height:40,width:40}} /><p>Sunset</p></li>
            <li><h2>{pressure}</h2> <WiBarometer  style={{height:40,width:40}}/><p>Pressure</p></li>
          </ul>
        </div>
      </div>

      <div className="bottom-top">
        <div className="bottom">
          <div className="sub-bottom"><p>Coords</p><p>Latitude <br></br>{lt}</p><bar></bar><p>Longitude</p><p>{lon}</p></div>
          <div className="sub-bottom"><p>Wind</p><p>Deg:{deg}</p><p>Speed{speed}</p></div>
          <div className="sub-bottom"><p>Other</p><p>data</p><p>__</p></div>
          <div className="sub-bottom"><p>Other</p><p>data</p><p>__</p></div>
          <div className="sub-bottom"><p>Other</p><p>data</p><p>__</p></div>
          <div className="sub-bottom"><p>Other</p><p>data</p><p>__</p></div>
    
        </div>
      </div>
      

    </div>
  );
}

export default App;
