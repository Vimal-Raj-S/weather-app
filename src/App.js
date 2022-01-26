import { useEffect, useState } from "react";
import clear from "./pic/clear.jpg";
import cloudy from "./pic/cloudy.jpg";
import overcast from "./pic/overcast.jpg";
import rainy from "./pic/rainy.jpg";
import snow from "./pic/snow.jpg";
import "./App.css";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [place, setPlace] = useState("chennai");
  const [placeinfo, setPlaceinfo] = useState({});
  useEffect(() => {
    weather();
  }, []);
  const weather = () => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=b7f2e3725257401491350831222501&q=${place}&days=1&aqi=no&alerts=no`
    )
      .then((res) => res.json())
      .then((data) =>
        setPlaceinfo({
          name: data.location.name,
          country: data.location.country,
          temp: {
            current: data.current.temp_c,
            high: data.forecast.forecastday[0].day.maxtemp_c,
            low: data.forecast.forecastday[0].day.mintemp_c,
          },
          condition: data.current.condition.text,
        })
      );
    setPlace("");
  };

  return (
    <div
      className="app"
      style={
        placeinfo.condition?.toLowerCase() === "clear" ||
        placeinfo.condition?.toLowerCase() === "sunny"
          ? { backgroundImage: `url(${clear})` }
          : placeinfo.condition?.includes("cloudy")
          ? { backgroundImage: `url(${cloudy})` }
          : placeinfo.condition?.toLowerCase().includes("rainy")
          ? { backgroundImage: `url(${rainy})` }
          : placeinfo.condition?.toLowerCase().includes("snow")
          ? { backgroundImage: `url(${snow})` }
          : { backgroundImage: `url(${overcast})` }
      }
    >
      <div className="search-input">
        <input
          type="text"
          value={place}
          placeholder="search place....."
          onChange={(e) => setPlace(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              weather();
            }
          }}
        />
      </div>
      <div className="weather-container">
        <div className="top-part">
          <h1>{placeinfo.temp?.current}℃</h1>
          <div className="condition-high-low">
            <h1>{placeinfo.condition}</h1>
            <h1>{placeinfo.temp?.high}℃</h1>
            <h1>{placeinfo.temp?.low}℃</h1>
          </div>
        </div>
        <h2>
          {placeinfo.name} , {placeinfo.country}
        </h2>
      </div>
    </div>
  );
}

export default App;
