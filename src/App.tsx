import React, { useEffect, useState } from 'react';
import axios from "axios"
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'


function App() {


  const [temperature, setTemp] = useState<number>(0)
  let [weather, setWeather] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [weatherIcon, setWeatherIcon] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  // const ["le state que tu veux", "la fonction pour set la variable"] = useState<"Le type du state">("La valeur par défault")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(positionReceived, console.error);
  }, [])


  const positionReceived = (pos: Position) => {
    const lat = pos.coords.latitude
    const long = pos.coords.longitude

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=19846416d35dbf0e051ae8b93651a19c`)
      .then((res) => {
        console.log(res)
        setTemp(res.data.main.temp - 273.15)
        setWeather(res.data.weather[0].main)
        setCity(res.data.name)
        setWeatherIcon(res.data.weather[0].icon)
        setLoading(false)
      })

      .catch(error => {
        console.warn("ERREUR: ", error)
      })

  }

  console.log(temperature)
  console.log(weather)
  console.log(weatherIcon)

  const comment = () => {
    switch (weather) {
      case "Clear":
        return "The sun is shinning, have a wonderful day !"
      case "Clouds":
        return "Well, that's ok, clouds make for a beautiful dreamy landscape !"
      case "Thunderstorm":
        return "Good luck today, cover yourself !"
      case "Drizzle":
        return "Put an umbrella over your head and a smile on your face"
      case "Rain":
        return "Smile under the rain"
      case "Snow":
        return "Yesssss it's snowiiiiiing"
      case "Mist":
        return "Mistic day"
      default:
        return null;
    }
  }
  console.log(comment)


  if (loading) {
    return (
      <div className="loader">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </div>
    )
  }



  return (
    <div className="App">
      <div className="boxed">
        The weather is:
      <br />
        {weather}
        <div>
          <img alt="weather" src={"http://openweathermap.org/img/wn/" + weatherIcon + ".png"} />
          <div className="comment">{comment()}</div>
        </div>
      </div>
      <div className="">
        The temperature in {city} is :
        <div className="temperature">
          {' ' + temperature.toFixed(0) + " °"}
        </div>
      </div>

      <div className="position">
        Your current position is : {city}
        {/*"latitude: " + latitude + " longitude: " + longitude*/}
      </div>

    </div>

  );
}


export default App;
