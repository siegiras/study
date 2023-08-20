let locationAPI = "https://api.mapbox.com/search/geocode/v6/forward";
let locationToken =
  "pk.eyJ1IjoidGhpZW5uZDM1ODkiLCJhIjoiY2twdGc1MWZuMWR5cjJucGE4azF4YWF5cyJ9.32NeCzGd4iVMemx5366fNg";
let weatherToken = "fGohhSpODDQjB9shqIi8VgHgXMa8AU15";
let weatherLink = "https://api.tomorrow.io/v4/weather/realtime";
fetch(`${locationAPI}?q=hanoi&access_token=${locationToken}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const result = data.features[0];
    document.getElementById("locationName").textContent =
      result.properties.name;
  });
let searchText = "";
function onChange(event) {
  searchText = event.target.value;
}

function onClickButton() {
  fetch(`${locationAPI}?q=${searchText}&access_token=${locationToken}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const result = data.features[0];
      document.getElementById("locationName").textContent =
        result.properties.name;
      const latitude = result.geometry.coordinates[1];
      const longitude = result.geometry.coordinates[0];
      fetch(
        `${weatherLink}?location=${latitude},${longitude}&fields=temperature&units=metric&apikey=${weatherToken}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          console.log(result.data.values.temperature);
          document.getElementById("temperatureID").textContent =
            result.data.values.temperature;
        });
    });
}
