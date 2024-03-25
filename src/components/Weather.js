import { useEffect, useState } from "react";
import Search from "./Search";
import "./Weather.css";
import clear_sky from "../assets/clear sky.png";
import clouds from "../assets/clouds.png";
import few_clouds from "../assets/few clouds.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import strom from "../assets/storm.png";
import wind from "../assets/wind.png";
import { AnimatedCircle } from "react-craftify-spinners";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [icon, setIcon] = useState();

  const fetchWeather = async (param) => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=a9b22cf5bb70ad09d92ae3a3162528fa`
        );
        const result = await res.json();
        console.log(result);
        if (result) {
          setData(result);
          setLoading(false);
        }
      }, 1000);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("trichy");
  }, []);

  const handleSubmit = () => {
    fetchWeather(search);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (data && data.weather && data.weather[0]) {
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setIcon(clear_sky);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setIcon(few_clouds);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setIcon(clouds);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setIcon(clouds);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setIcon(rain);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setIcon(rain);
      } else if (
        data.weather[0].icon === "11d" ||
        data.weather[0].icon === "11n"
      ) {
        setIcon(strom);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setIcon(snow);
      } else if (
        data.weather[0].icon === "50d" ||
        data.weather[0].icon === "50n"
      ) {
        setIcon(wind);
      } else {
        setIcon(null);
      }
    }
  }, [data]);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSubmit}
      />
      {loading ? (
        <AnimatedCircle />
      ) : (
        <div>
          <div className="icons">
            <img src={icon} alt="" className="weather-icon" />
          </div>
          <div className="city-name">
            <h2>
              {data?.name}, <span>{data?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">{data?.main?.temp}</div>
          <p className="description">
            {data && data.weather && data.weather[0]
              ? data.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{data?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="wind">{data?.main?.humidity}</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
