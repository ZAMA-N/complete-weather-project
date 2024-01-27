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

let searchFormElement = document.querySelector("#search-formElement");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("durban");
