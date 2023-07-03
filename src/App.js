import React, { useState, useEffect } from "react";

import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";
import Error from "./components/Error";

import "./App.css";

const App = () => {
    const [searchValue, setSearchValue] = useState("");
    const [tempInfo, setTempInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [mess, setMess] = useState("");

    const getWeatherInfo = async () => {
        try {
            setIsLoading(true);
            if (searchValue === "") {
                setMess("Enter city Name before search");
                setIsLoading(false);
                setIsError(true);
                return;
            }
            // weather api city name to temp, corrdinate		API-1
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

            let res = await fetch(url);
            let data = await res.json();

            if (data.main === undefined) {
                setMess(`${searchValue}  >>  City not found!!`);
                console.log(mess);
                setIsLoading(false);
                setIsError(true);
                return;
            }

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;
            const { lon, lat } = data.coord;
            // const { message } = data;
            console.log(lat + " " + lon);

            // get time zone from coordinates					API-2
            let realtime = `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=${process.env.REACT_APP_GETTIME_API_USERNAME}`;

            let res1 = await fetch(realtime);
            let data1 = await res1.json();
            // console.log(data1)
            const { timezoneId } = data1;
            // console.log(timezoneId);

            // get curent time of entered CITY					API-3
            let local = `https://timezoneapi.io/api/timezone/?${timezoneId}&token=${process.env.REACT_APP_TIMEZONE_API_TOKEN}`;

            let res2 = await fetch(local);
            let data2 = await res2.json();
            // console.log(data2);

            if (data2) {
                setIsLoading(false);
                setIsError(false);
            }

            let {
                date,
                hour_12_wilz: hr,
                minutes: min,
                seconds: sec,
                hour_am_pm: session,
            } = data2.data.datetime;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
                date,
                hr,
                min,
                sec,
                session,
            };

            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error);
        }
    };

    const getCurrentLoc = () => {
        setIsLoading(true);
        setSearchValue("");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else return;
    };

    const showPosition = async (pos) => {
        try {
            console.log(pos.coords.latitude);
            console.log(pos.coords.longitude);
            let lat = pos.coords.latitude;
            let lon = pos.coords.longitude;

            setIsLoading(true);
            // coord to name  of city		API-4
            let url0 = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

            let res0 = await fetch(url0);
            let data0 = await res0.json();

            if (data0.main === undefined) {
                console.log("refrehs error");
                setMess("Current Location City not found!!");
                // console.log(mess);
                setIsLoading(false);
                setIsError(true);
                return;
            }
            setSearchValue(data0.name);
            console.log(searchValue + " ");
            // const { name:nam } = data0;
            // console.log("1. " + nam);

            setIsLoading(false);
            setIsError(true);
            setMess("Click Search!!");
            return;
        } catch (err) {
            console.log(err);
        }
    };
    const showError = (err) => {
        switch (err.code) {
            case err.PERMISSION_DENIED:
                setMess("User Denial Permission");
                break;
            case err.POSITION_UNAVAILABLE:
                setMess("Location info is not available");
                break;
            case err.TIMEOUT:
                setMess("Request Timeout");
                break;
            case err.UNKNOWN_ERROR:
                setMess("Unknown error occur");
                break;
            default:
                setMess("Service Unavailable");
        }
        setIsError(true);
        setIsLoading(false);
    };

    useEffect(() => {
        getCurrentLoc();
        // getWeatherInfo();
    }, []);

    return (
        <>
            <div className="flexclass">
                <div className="wrap">
                    <div className="search">
                        <div className="conts">
                            <div className="lefts">
                                <input
                                    type="search"
                                    placeholder="search..."
                                    autoFocus
                                    id="search"
                                    className="searchTerm"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />

                                <button
                                    className="searchButton"
                                    type="button"
                                    onClick={getWeatherInfo}
                                >
                                    Search
                                </button>
                            </div>

                            <div className="rights">
                                <button
                                    className="curloc"
                                    onClick={getCurrentLoc}
                                >
                                    <i className="fa-duotone fa-location-crosshairs"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    // isLoading ? <Loading /> : <WeatherCard {...tempInfo} />
                    isLoading ? <Loading /> : isError ? <Error mess={mess} /> : <WeatherCard {...tempInfo} />
                }
            </div>
        </>
    );
};

export default App;
