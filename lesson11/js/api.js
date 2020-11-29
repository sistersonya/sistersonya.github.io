const FHweather = "https://api.openweathermap.org/data/2.5/weather?lat=42.0380399&lon=-111.4048681&appid=91a14b3e44979104098259be0b0f8f5c&units=imperial";
const FHforecast = "https://api.openweathermap.org/data/2.5/forecast?lat=42.0380399&lon=-111.4048681&appid=91a14b3e44979104098259be0b0f8f5c&units=imperial";

const PRweather = "https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=91a14b3e44979104098259be0b0f8f5c&units=imperial";
const PRforecast = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=91a14b3e44979104098259be0b0f8f5c&units=imperial";

const SSweather = "https://api.openweathermap.org/data/2.5/weather?id=5607916&appid=91a14b3e44979104098259be0b0f8f5c&units=imperial";
const SSforecast = "https://api.openweathermap.org/data/2.5/forecast?id=5607916&appid=91a14b3e44979104098259be0b0f8f5c&units=imperial";

let currentTown = document.querySelector("#town-page").innerHTML;
let wetherAPI = "";
let forecastAPI = "";
let town = "";

if (currentTown == "Fish Haven") {
    wetherAPI = FHweather;
    forecastAPI = FHforecast;
    town = currentTown;
} else if (currentTown == "Preston") {
    wetherAPI = PRweather;
    forecastAPI = PRforecast;
    town = currentTown;
} else if (currentTown == "Soda Springs") {
    wetherAPI = SSweather;
    forecastAPI = SSforecast;
    town = currentTown;
};

fetch(wetherAPI)
    .then((response) => response.json())
    .then((jsObject) => {
        let t = parseFloat(jsObject.main.temp);
        let s = parseFloat(jsObject.wind.speed);
        let output = "N/A";
        //console.log(jsObject);
        document.getElementById('condition').innerHTML = jsObject.weather[0].main;
        document.getElementById('currenttemp').innerHTML = Math.round(t);
        if (t <= 50 && s >= 3) {
            let f = (35.74 + (0.6215 * t)) - (35.75 * (Math.pow(s, 0.16))) + (0.4275 * (t * (Math.pow(s, 0.16))));
            output = Math.round(f) + "&#8457;";
          };
          document.getElementById("windChill").innerHTML = output;
        document.getElementById('hum').innerHTML = jsObject.main.humidity;
        document.getElementById('speed').innerHTML = Math.round(s);
    }); 


fetch(forecastAPI)
    .then((response) => response.json())
    .then((jsObject) => {
        // console.log(jsObject);

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


fetch('https://byui-cit230.github.io/weather/data/towndata.json')
.then(function (response) {
  return response.json();
})
.then(function (jsonObject) {
  let towns = jsonObject["towns"];
  let uniqueTown = towns.filter(i => (i.name == town));
  
  let list = document.createElement("ul"); 
  
  let townEvents = uniqueTown[0].events;
    townEvents.forEach(detail => {
    let listItem = document.createElement("li");
    listItem.innerHTML = detail;
    list.appendChild(listItem);
  }); 
  document.querySelector("section.upcomingEvents").appendChild(list);
});
