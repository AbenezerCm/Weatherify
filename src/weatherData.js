// import React from "react";
const axios = require("axios").default;

export async function WeatherApi() {
  const apiKey = "4dd72ff18e578b5b66a5bb372c197da7";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=addis%20ababa&units=metric&appid=" +
    apiKey;

  axios
    .get(url)
    .then((response) => {
      const data = response.data.main.temp;
      console.log(response);
      console.log("Temprature : " + response.data.main.temp);
      console.log("data: " + data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("APi call working!!!");
}
