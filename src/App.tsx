import React, { useEffect, useState } from 'react';
import axios from "axios"
import './App.css';

function App() {
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)
  const [temperature, setTemp] = useState<number>(0)
  let [weather, setWeather] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [weatherIcon, setWeatherIcon] = useState<string>('')

  // const ["le state que tu veux", "la fonction pour set la variable"] = useState<"Le type du state">("La valeur par défault")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(positionReceived, console.error);
  }, [])


  const positionReceived = (pos: Position) => {
    const lat = pos.coords.latitude
    const long = pos.coords.longitude
    setLatitude(lat)
    setLongitude(long)

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=19846416d35dbf0e051ae8b93651a19c`)
      .then((res) => {
        console.log(res)
        setTemp(res.data.main.temp - 273.15)
        setWeather(res.data.weather[0].main)
        setCity(res.data.name)
        setWeatherIcon(res.data.weather[0].icon)
      })

      .catch(error => {
        console.warn("ERREUR: ", error)
      })

  }

  console.log(temperature)
  console.log(weather)
  console.log(weatherIcon)


  /*const renderIcon = () => {
    switch (weather) {
      case "Clear":
        return <img src="http://openweathermap.org/img/wn/01d.png" />
      case "Clouds":
        return  <img src="http://openweathermap.org/img/wn/03d.png" />
      case "Thunderstorm":
        return  <img src="http://openweathermap.org/img/wn/11d.png" />
      case "Drizzle":
        return  <img src="http://openweathermap.org/img/wn/09d.png" />
      case "Rain":
        return  <img src="http://openweathermap.org/img/wn/10d.png" />
      case "Snow":
        return  <img src="http://openweathermap.org/img/wn/13d.png " />
      case "Mist":
        return  <img src="http://openweathermap.org/img/wn/50d.png" />
      default:
        return null;
    }
  }*/

  return (
    <div className="App">
      Your current position is : {city}
      {/*"latitude: " + latitude + " longitude: " + longitude*/} 
      <div>
        The current temperature in {city} is :
        {' '+ temperature.toFixed(0) + " degrees"}
      </div>
      <div>
        The current weather is: 
      <br />
      {weather}
      </div>
      <img src={"http://openweathermap.org/img/wn/" + weatherIcon + ".png"}/>

      {/*renderIcon()*/}
    </div>
  );
  }


export default App;
