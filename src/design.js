function refresh(response) {
  let temp = document.querySelector("#weatherTemparature");
  let newTemp = response.data.temperature.current;
  let city = document.querySelector("#city-Element");
  let skyElement = document.querySelector("#sky");
  let speedElement = document.querySelector("#speed");
  let Humid=document.querySelector("#Humidity");
let time=document.querySelector("#day-time");
let date=new Date(response.data.time*1000)
let iconElement=document.querySelector("#icon-app");


iconElement.innerHTML =`<img src="${response.data.condition.icon_url}"class="icon" />`;
time.innerHTML = formateDate(date);
 Humid.innerHTML=`${response.data.temperature.humidity}%` ;
speedElement.innerHTML = `${response.data.wind.speed}km/h`;
  skyElement.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;
  temp.innerHTML = Math.round(newTemp);

  getForecast(response.data.city);

  console.log(response.data);
}

function formateDate(date){
   let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let minutes=date.getMinutes()
let hours=date.getHours()

let day = days[date.getDay()];
if (minutes<10){
    minutes=`0${minutes}`
}

return `${day} ${hours}:${minutes} ,`;

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
function getForecast(city){

let apiKey = "40ee530ff803da5b8e0cef03o6106td1";
let apiUrl =
  `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metrics`;
  axios(apiUrl).then(displayForecast);

}

function NewDay(timestamp){
    let date=new Date(timestamp*1000);
    let days=["sun","Mon","Tue","wed","Thu","Fri","Sat"]
    return days[date.getDay()]
}

function displayForecast(response) {
console.log(response)

let forecast= document.querySelector("#forecast");

 let forecastHtml="";

  response.data.daily.forEach(function (day, index) {
if (index <5){

    forecastHtml =
      forecastHtml +
      `
      <div class="forecast-day">
        <div class="forecast-date">${NewDay(day.time)}</div>
        <div >
        <img src="${day.condition.icon_url} " class="forecast-icon"/></div>
        <div class="forecast-Temperatures">
          <div class="forecast-Temperature">
            <strong>${Math.round(day.temperature.maximum / 10)}°/</strong>
          </div>
          <div class="forecast-Temp">${Math.round(
            day.temperature.minimum / 10
          )}°</div>
        
        </div>
      </div>
    `;
          }
  });
  forecast.innerHTML=forecastHtml
}

let searchFormElement = document.querySelector("#search-formElement");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("durban");

