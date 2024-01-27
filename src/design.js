function refresh(response) {
  let temp = document.querySelector("#weatherTemparature");
  let newTemp = response.data.temperature.current;
  let city = document.querySelector("#city-Element");
  city.innerHTML = response.data.city;
  temp.innerHTML = Math.round(newTemp);

  console.log(response.data);
}

function searchCity(city) {
  let apikey = "40ee530ff803da5b8e0cef03o6106td1";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&unit=metrics`;

  axios.get(apiUrl).then(refresh);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-Input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-formElement");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("durban");
