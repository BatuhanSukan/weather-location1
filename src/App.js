import { useEffect, useState } from "react";
import { usePosition } from "use-position";
import axios from "axios";
import HavaDurumu from "./components/HavaDurumu";

const App = () => {
  const [weather,setWeather] = useState();
  const {latitude,longitude, } = usePosition();

  const getWeatherData = async (lat,lon) => {
    const key = process.env.REACT_APP_WEATHER_API_KEY;
    const lang = navigator.language.split("-")[0];
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8ee0070b67ea27d087e1a313b5446401&lang=${lang}&units=metric`)
      setWeather(data);
    } catch {
      alert("Veri alınırken hata oluştu.")
    }
    
  }

  useEffect(() =>{
    latitude && longitude && getWeatherData(latitude,longitude);
  },[latitude,longitude]);

  return (
    <div>
      <h2>Hava Durumu</h2>
      <HavaDurumu weather={weather}/>
    </div>

  )
  
}

export default App;

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}