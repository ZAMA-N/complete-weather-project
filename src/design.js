function handleSearch(event){
event.preventDefault();
let searchInput=document.querySelector("#search-form-Input")
let city=document.querySelector("#city-Element");
city.innerHTML= searchInput.value


};

let searchFormElement=document.querySelector("#search-formElement")
searchFormElement.addEventListener("submit",handleSearch)