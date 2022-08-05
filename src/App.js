import "./App.css";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const axios = require("axios").default;

function App() {
  const [reload, setReload] = useState(false);
  const [cityInput, setCityInput] = useState("addis ababa");
  const [details, setDetails] = useState({
    tempratue: "",
    humidity: "",
    windspeed: "",
    feelslike: "",
    pressure: "",
    visibility: "",
    country: "",
    cityname: "",
    main: "",
    description: "",
    icon: "",
  });

  const apiKey = "4dd72ff18e578b5b66a5bb372c197da7";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setDetails({
          tempratue: response.data.main.temp,
          windspeed: response.data.wind.speed,
          humidity: response.data.main.humidity,
          feelslike: response.data.main.feels_like,
          visibility: response.data.visibility,
          pressure: response.data.main.pressure,
          country: response.data.sys.country,
          cityname: response.data.name,
          main: response.data.weather[0].main,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setCityInput("");
  }, [reload]);

  function iconClickHandler() {
    if (reload === false) {
      setReload(true);
    } else {
      setReload(false);
    }
  }

  function keyPressHandler(evt) {
    if (evt.key === "Enter") {
      iconClickHandler();
    } else {
    }
  }

  const currentDate = new Date().toLocaleString("en-US");
  var displayPic = "";

  if (details.main === "Clear") {
    displayPic = "/sunny.jpg";
  } else if (details.main === "Clouds") {
    displayPic = "/cloudy.jpg";
  } else if (details.main === "Rain" || details.main === "Drizzle") {
    displayPic = "/rainy.jpg";
  } else if (details.main === "Thunderstorm") {
    displayPic = "./Thunderstorm.jpg";
  } else if (details.main === "Smoke" || details.main === "Mist") {
    displayPic = "./mist.jpg";
  } else if (details.main === "Snow") {
    displayPic = "./snow.jpg";
  } else {
    displayPic = "./cloudy.jpg";
  }

  return (
    <div>
      <div
        className="App"
        style={{ backgroundImage: `url(${displayPic})` }}
      ></div>
      <div className="flex-container">
        <div
          className="container1"
          style={{ backgroundImage: `url(${displayPic})` }}
        >
          <div className="contents">
            <div className="temp">
              <h1>
                {Math.floor(details.tempratue)}°
                <span className="degree">c</span>
              </h1>
            </div>
            <div className="date">
              <h1>
                {details.cityname}, {details.country}
              </h1>
              <h3>{currentDate}</h3>
            </div>
            <div className="condition">
              <span>
                <img
                  src={`http://openweathermap.org/img/wn/${details.icon}@2x.png`}
                  alt="weather_icon"
                />
              </span>
              <h2>
                {details.main}, {details.description}
              </h2>
            </div>
          </div>
          <div className="container2">
            <div className="Input-div">
              <TextField
                sx={{
                  "& .MuiFormLabel-root": {
                    color: "white",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "white",
                  },
                  input: { color: "white" },
                }}
                id="standard-basic"
                label="City Name"
                variant="standard"
                autoComplete="off"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyPress={keyPressHandler}
              />

              <SearchOutlinedIcon
                className="search_icon"
                fontSize="large"
                onClick={iconClickHandler}
              />
              <hr className="rule" />
              <h3>Weather Details</h3>
            </div>

            <div className="info-div">
              <div className="info-title">
                <h4>Temp</h4>
                <h4>Feels Like</h4>
                <h4>Humidity </h4>
                <h4>Wind</h4>
                <h4>Pressure</h4>
                <h4>Visibility</h4>
              </div>
              <div className="info-result">
                <h4> {Math.floor(details.tempratue)}℃</h4>
                <h4>{Math.floor(details.feelslike)}℃</h4>
                <h4>{details.humidity}%</h4>
                <h4>{details.windspeed}m/s</h4>
                <h4>{details.pressure}hpa</h4>
                <h4>{Math.floor(details.visibility / 1000)}km</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
