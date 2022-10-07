const key ='egiLHjKjZFk73dAeQtAAdhEKZIDxtt3z'
//get weather info

const getWeather = async(id) => {
 
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query =`${id}?apikey=${key}`;

    const response =await fetch(base + query);
    const data = await response.json();

    return data[0];
};

//get city info

const getCity = async (city) =>{

    const base ='http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];


};

//getCity('Dhaka').then(data => {
//    return getWeather(data.Key);
//}).then(data =>{console.log(data);
//})
//.catch(err => console.log(err));

const cityForm = document.querySelector('form');
const card= document.querySelector('.card');
const details= document.querySelector('.weather');

const updateUI = (data) => {
    const {cityD , weather} = data;

    
    details.innerHTML=`
        <h2 class="city">Location: ${cityD.EnglishName} </h2>
        <h2 class="city">Status: ${weather.WeatherText} </h2>
        <div class="temp">
            <span><h3>Celcius: ${weather.Temperature.Metric.Value} &deg;C </h3></span>
            
        </div>
        <div class="temp">
            <span><h3>Farhenite: ${weather.Temperature.Imperial.Value} &deg;F </h3></span>
           <div class> 
        
        
        `;    
};
        //<div class="humidity">Humidity:</div>
        //<div class="wind">Wind speed:</div>   

const updateCity = async (city) => {
    
    //console.log(city)
    const cityD = await getCity(city);
    const weather = await getWeather(cityD.Key);

    return{ cityD , weather };
};
cityForm.addEventListener('submit' , e => {
    
    
    e.preventDefault();

    //get city value

    const city = cityForm.city.value.trim();
    cityForm.reset();
    
//update the ui with city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});
