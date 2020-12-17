
const apiUrlWeather = "https://api.openweathermap.org/data/2.5/weather?id=3530103&appid=be14a1ff53702fd2e9589f95f2b6719e&units=imperial";
fetch(apiUrlWeather)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        document.getElementById('condition').textContent = jsObject.weather[0].main;
        document.getElementById('currenttemp').textContent = jsObject.main.temp;
        document.getElementById('hum').textContent = jsObject.main.humidity;
        document.getElementById('speed').textContent = jsObject.wind.speed;
    }); 

const apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?id=3530103&appid=be14a1ff53702fd2e9589f95f2b6719e&units=imperial";
fetch(apiUrlForecast)
    .then((response) => response.json())
    .then((jsObject) => {
          const threeDayForecast = jsObject.list.filter(x => x.dt_txt.includes("18:00:00"));
            // console.log(fiveDayForecast);
            const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                let days = 0;
                    threeDayForecast.forEach(forecast => {
                        let d = new Date(forecast.dt_txt);
                        let imgage = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
                        let desc = forecast.weather[0].description;
                            document.getElementById(`temp${days+ 1}`).innerHTML = `${forecast.main.temp.toFixed(0)}`;
                            document.getElementById(`day${days+ 1}`).textContent = week[d.getDay()];
                            document.getElementById(`icon${days+ 1}`).setAttribute('src', imgage);
                            document.getElementById(`icon${days+ 1}`).setAttribute('alt', desc);
                days++;
                });
    });