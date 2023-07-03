import React, { useEffect } from "react";

const WeatherCard = ({
    temp,
    humidity,
    pressure,
    weathermood,
    name,
    speed,
    country,
    sunset,
    date, hr, min, sec, session
}) => {
    const [weatherState, setWeatheState] = React.useState("");  
    // console.log(`${hr} : ${min} : ${sec}`);

    useEffect(() => {
        if (weathermood) {
            switch (weathermood) {
                case "Clouds":
                    setWeatheState("wi-day-cloudy");
                    break;
                case "Haze":
                    setWeatheState("wi-fog");
                    break;
                case "Clear":
                    setWeatheState("wi-day-sunny");
                    break;
                case "Mist":
                    setWeatheState("wi-dust");
                    break;
                case "Rain":
                    setWeatheState("wi-day-rain");
                    break;
                case "Thunderstorm":
                    setWeatheState("wi-day-thunderstorm");
                    break;
                case "Drizzle":
                    setWeatheState("wi-day-showers");
                    break;
                case "Snow":
                    setWeatheState("wi-day-snow");
                    break;
                case "Smoke":
                    setWeatheState("wi-smoke");
                    break;
                case "Dust":
                    setWeatheState("wi-dust");
                    break;
                case "Fog":
                    setWeatheState("wi-day-fog");
                    break;

                default:
                    setWeatheState("wi-day-cloudy-high");
                    break;
            }
        }
    }, [weathermood]);

    // converting the seconds into time
    let secs = sunset;
    let dates = new Date(secs * 1000);
    let hrss = dates.getHours() > 12 ? dates.getHours()-12 : dates.getHours();
    hrss = hrss < 10 ? "0" + hrss : hrss;
    let timeStr = `${hrss}:${dates.getMinutes()}`;

    return (
        <>
            <article className="widget">
                <div className="weatherIcon">
                    <i className={`wi ${weatherState} anim`}></i>
                </div>

                <div className="weatherInfo">
                    <div className="temperature">
                        <span>{temp}&deg;C</span>
                    </div>

                    <div className="description">
                        <div className="weatherCondition">{weathermood}</div>
                        <div className="place">
                            {name}, {country}
                        </div>
                    </div>
                </div>

                {/* <div className="date"> {new Date().toLocaleString()} </div> */}
                <div className="date"> 
                    {date} <br />
                    {hr}:{min}:{sec} {session}
                </div>

                {/* our 4column section  */}
                <div className="extra-temp">
                    <div className="temp-info-minmax">
                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-sunset"}></i>
                            </p>
                            <p className="extra-info-leftside">
                                {timeStr} PM <br />
                                Sunset
                            </p>
                        </div>

                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-humidity"}></i>
                            </p>
                            <p className="extra-info-leftside">
                                {humidity} % <br />
                                Humidity
                            </p>
                        </div>
                    </div>

                    <div className="weather-extra-info">
                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-rain"}></i>
                            </p>
                            <p className="extra-info-leftside">
                                {pressure} MB <br />
                                Pressure
                            </p>
                        </div>

                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-strong-wind"}></i>
                            </p>
                            <p className="extra-info-leftside">
                                {speed} M/S <br />
                                Speed
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

export default WeatherCard;
