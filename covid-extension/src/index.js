const axios =require("axios") ;  //axios is a dependancy to fetch a data
const api = "http://covid19.mathdro.id/api/countries";
const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
const cases = document.querySelector(".cases");
const recovered = document.querySelector(".recovered");
const deaths = document.querySelector(".deaths");
const results = document.querySelector(".result-container");
results.style.display = "none";  //css results not displayed in the beginning
loading.style.display = "none";
errors.textContent = "";
//grab the form
const form = document.querySelector(".form-data");
//grab the country name
const country = document.querySelector(".country-name");
//decalre a method to search by a country name

async function searchForCountry(countryName) {


    loading.style.display = "block";
   
    try {
        const response = await axios.get(`${api}/${countryName}`)  //fetching data
        loading.style.display = "none";
        cases.textContent = response.data.confirmed.value;
        recovered.textContent = response.data.recovered.value;
        deaths.textContent = response.data.deaths.value;
        results.style.display = "block";
       
    } catch (error) {
        loading.style.display = "none";
        results.style.display = "none";
        errors.textContent = "We have no data for country you have requested";
    }
} 


function handleSubmit(){

    // e.preventDefault();
    searchForCountry(country.value);       //input country name
    console.log(country.value);         //data for searched country consoled
};
form.addEventListener("submit",  handleSubmit())