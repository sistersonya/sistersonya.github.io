const apiURL =  "https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=be14a1ff53702fd2e9589f95f2b6719e&units=imperial";
fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        // console.log(jsObject);
        const currentTemp = document.querySelector('#current-temp');
        const icon = document.querySelector('img');
        // const icon = document.querySelector('#icon');

        currentTemp.textContent = jsObject.main.temp;

        const imagesrc = `https://openweathermap.org/img/w/${jsObject.weather[0].icon}.png`
        const desc = jsObject.weather[0].description;

        icon.setAttribute('src', imagesrc);
        icon.setAttribute('alt', desc);

    });     


const apiUrlWeather = "https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=be14a1ff53702fd2e9589f95f2b6719e&units=imperial";
fetch(apiUrlWeather)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        document.getElementById('condition').textContent = jsObject.weather[0].main;
        document.getElementById('currenttemp').textContent = jsObject.main.temp;
        document.getElementById('hum').textContent = jsObject.main.humidity;
        document.getElementById('speed').textContent = jsObject.wind.speed;
    }); 

const apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=be14a1ff53702fd2e9589f95f2b6719e&units=imperial";
fetch(apiUrlForecast)
    .then((response) => response.json())
    .then((jsObject) => {
        // console.log(jsObject);
        // document.getElementById('condition').textContent = jsObject.list[0].weather[0].main;
        // document.getElementById('currenttemp').textContent = jsObject.list[0].main.temp;
        // document.getElementById('hum').textContent = jsObject.list[0].main.humidity;
        // document.getElementById('speed').textContent = jsObject.list[0].wind.speed;

            const fiveDayForecast = jsObject.list.filter(x => x.dt_txt.includes("18:00:00"));
            // console.log(fiveDayForecast);
            const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                let days = 0;
                    fiveDayForecast.forEach(forecast => {
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