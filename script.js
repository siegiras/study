var long = 0; //kinh do
var lai = 0; //vi do
var temperature = new Array();
var weatherCode = new Array();
var diw = new Date();
var dmy = new Array();
const lctURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/soc%20son.json?country=vn&access_token=pk.eyJ1IjoiZmlubmlja2siLCJhIjoiY2twdHk2czkyMDhxNTMyb2p6MmU5MTY1bSJ9.iauRukEs2mSAIFiMzzlvJQ";
const url_Weather1 = "https://api.tomorrow.io/v4/timelines?location=";
const url_Weather2 =
  "&fields=temperature,weatherCode&timezone=Asia/Ho_Chi_Minh&timesteps=current,1d&units=metric&apikey=KLqtBglPQFjtNf8IdyPVRo8OjTneTOAO";

fetch(lctURL)
  .then(function (result) {
    return result.json();
  })
  .then(function (data) {
    lai = data.features[0].center[0]; //lay data vi do
    long = data.features[0].center[1]; //lay data kinh do
  })
  .then(function () {
    fetch(`${url_Weather1}${long},${lai}${url_Weather2}`) //21.27083,105.82917 fetch data
      .then(function (result) {
        return result.json();
      })
      .then(function (data) {
        // Greetings
        // document.querySelector(".hello").textContent = hello();
        // Show temperature today
        var tempNow = data.data.timelines[0].intervals[0].values.temperature;
        document.querySelector(".temperature").innerHTML = tempNow + `&deg;C`;

        // Show weather today
        var weatherNow = data.data.timelines[0].intervals[0].values.weatherCode;
        document.querySelector(".status").innerHTML = changeCode(weatherNow);

        // Show day in week
        document.querySelector(".diw").innerHTML = dInWeek(diw.getDay());

        // Get data weather, weatherCode and day/month/year of nextday
        for (var i = 1; i <= 6; i++) {
          temperature.push(
            data.data.timelines[1].intervals[i].values.temperature
          );
          weatherCode.push(
            data.data.timelines[1].intervals[i].values.weatherCode
          );
          dmy.push(data.data.timelines[1].intervals[i].startTime);
        }
      })
      .then(function () {
        // slice data into year-month-day follow data fetch
        var index = dmy[0].indexOf("T");
        for (var i = 0; i < 6; i++) {
          dmy[i] = dmy[i].slice(0, index);
        }
      })
      .then(function () {
        var i = 0;

        // show dmy of this day
        if (i == 0) {
          var now = getNextDay(i);
          document.querySelector(".dmy").textContent = now;
        }
        // show Data of nextday
        for (i = 1; i <= 6; i++) showData(i, temperature, weatherCode);
      })
      .catch(function (err) {
        console.log(err);
      });
  })
  .catch(function (err) {
    console.log(err);
  });

// API thoi tiet
// KLqtBglPQFjtNf8IdyPVRo8OjTneTOAO

// Get today
function getNextDay(i) {
  var date = new Date();
  var getdmy;
  getdmy = parseInt(date.getDate() + i) + "/";
  getdmy = getdmy + parseInt(date.getMonth() + 1) + "/";
  getdmy = getdmy + date.getFullYear();
  return getdmy;
}

// Get this time
function thisTime() {
  var hour = new Date();
  var gethour;
  if (hour.getHours() <= 9) gethour = "0" + hour.getHours() + " : ";
  else gethour = hour.getHours() + " : ";

  if (hour.getMinutes() <= 9)
    gethour = gethour + "0" + hour.getMinutes() + " : ";
  else gethour = gethour + hour.getMinutes() + " : ";

  if (hour.getSeconds() <= 9) gethour = gethour + "0" + hour.getSeconds();
  else gethour = gethour + hour.getSeconds();

  document.querySelector(".hour").textContent = gethour;
}
var count = setInterval(thisTime, 1000);

// Show weather of next 6 days
function showData(i, temperature, weatherCode) {
  var addWeather = document.querySelector(".info-days");
  var innerElement = `
  <div class="days grid grid-1">
    <p id="status-${i}" class="status-i">${changeCode(weatherCode[i - 1])}</p>
    <p id="diw-${i}" class="diw-i">${dInWeek(diw.getDay() + i)}</p>
    <p id="temp-${i}" class="temperature-i">${temperature[i - 1] + `&deg;C`}</p>
    <p id="dmy-${i}" class="dmy-i">${dmy[i - 1]}</p>
  </div>`;
  addWeather.innerHTML = addWeather.innerHTML + innerElement;
}

// Change weatherCode to name of weather
function changeCode(weatherCode) {
  var hour = new Date();
  var hours = hour.getHours();
  switch (weatherCode) {
    case 1000: {
      if ((hours >= 0 && hours <= 4) || (hours >= 20 && hours <= 23))
        return "Clear";
      else return "Sunny";
    }
    case 1100: {
      if ((hours >= 0 && hours <= 4) || (hours >= 19 && hours <= 23))
        return "Mostly Clear";
      else return "Mostly Sunny";
    }
    case 1001: {
      return "Cloudy";
    }
    case 4000: {
      return "Drizzle";
    }
    case 4001: {
      return "Rain";
    }
    case 4200: {
      return "Light Rain";
    }
    case 4201: {
      return "Heavy Rain";
    }
    case 8000: {
      return "Thunderstorm";
    }
    case 2100: {
      return "Light Fog";
    }
    case 2000: {
      return "Fog";
    }
    case 1101: {
      return "Partly Cloudy";
    }
    case 1102: {
      return "Mostly Cloudy";
    }
  }
}

// Determine day in week in everyday
function dInWeek(diw) {
  if (diw > 6) diw = diw - 7;
  switch (diw) {
    case 0: {
      return "Sunday";
      break;
    }
    case 1: {
      return "Monday";
      break;
    }
    case 2: {
      return "Tuesday";
      break;
    }
    case 3: {
      return "Wednesday";
      break;
    }
    case 4: {
      return "Thursday";
      break;
    }
    case 5: {
      return "Friday";
      break;
    }
    case 6: {
      return "Saturday";
      break;
    }
  }
}

// Greetings
// function hello() {
//   var greet = new Date();
//   var greethour = greet.getHours();
//   if (greethour >= 5 && greethour <= 11) return "Good morning!";
//   else if (greethour >= 12 && greethour <= 19) return "Good afternoon!";
//   else return "Good night!";
// }
