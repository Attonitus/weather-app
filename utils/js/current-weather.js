//Funciones importadas de otro archivos
// import weather from '../data/current-weather.js';
import {formatDate, formatTemp} from '../utils/formatt-data.js';
import {weatherConditionsCode} from './constants.js';
import {getLatLon} from './geolocation.js';
import {getCurrentWeather} from './services/weather.js'

// console.log(weatherConditionsCode['3'])


//Obtener la ciudad
function setCurrentCity($container, city) {
    $container.textContent = city
}

//Obtener la temperatura
function setCurrentTemp($container, temp) {
    $container.textContent = formatTemp(temp);
}

//Retornar si es de día o de noche
function solarStatus(sunsetTime, sunriseTime){
    const currentHours = new Date().getHours()
    const sunsetHours = sunsetTime.getHours();
    const sunriseHours = sunriseTime.getHours();

    if(currentHours > sunsetHours || currentHours < sunriseHours){
        return 'night'
    }
    return 'morning'
}
//Obtener el background dependiendo si es de día o de noche

function setBackground($container, conditionCode ,solarStatus) {
    //Guardamos en una constante el tipo de clima por ejemplo: weatherConditionsCode[8] = clean
    const weatherType = weatherConditionsCode[conditionCode];
    //Guardamos en una variable true o false dependiendo si el navegador detecta que una pantalla
    //es de cierto tamaño superior true o de tamaño inferrior false
    //Después evaluamos, si se cumple la condición entonces se cambiará la imagen de background
    //Si no, entonces se quedará con el tamaño inferior
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : '';
    // if(window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches){
    //     size = '@2x'
    // }
    $container.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`
}
//Obtener la fecha actual

function setCurrentDate($container) {
    const date = new Date();
    //Guardamos la fecha ya formateada
    const formattedDate = formatDate(date);
    $container.textContent = formattedDate;
}

function showCurrentWeather($app, $loader) {
    $app.hidden = false
    $loader.hidden = true
}

function configCurrentWeather(weather){
    const $app = document.querySelector('#app');
    const $loading = document.querySelector('#loading');


    //loader
    showCurrentWeather($app, $loading)
    //date
    const $currentWeatherDate = document.querySelector('#current-weather-date');
    setCurrentDate($currentWeatherDate)

    //city
    const $currentWeatherCity = document.querySelector('#current-weather-city');
    const city = weather.name;
    setCurrentCity($currentWeatherCity, city);
    //temp
    const $currentTemp = document.querySelector('#current-weather-temp');
    const temp = weather.main.temp;
    setCurrentTemp($currentTemp, temp);
    //background
    const sunriseTime = new Date(weather.sys.sunrise * 1000);
    const sunsetTime = new Date (weather.sys.sunset * 1000);
    //Convertimos los number en string con el fin de extraer con chart
    //sólo para traer un caracter em especifico ej. 803,   8 = 0,   0 = 1, 3 = 2
    String(weather.weather[0].id).charAt(0);
    const conditionCode = String(weather.weather[0].id).charAt(0);
    setBackground($app, conditionCode ,solarStatus(sunriseTime, sunsetTime))
}

export default async function currentWeather () {
    //GEO // API - WEATHER // Config

    const {lat, lon, isError} = await getLatLon();
    if(isError) return console.log('ha ocurrido un error ubicandote')
    console.log(lat,lon);

    // getCurrentPosition()
    //.then método del resolve, en caso de tener exito
    // .then((data) => {
    //     console.log('hemos triunfado', data)
    // })
    // //.catch método del reject, en caso de no tener exito
    // .catch((message)=>{
    //     console.log(message)
    // })
    const {isError: currentWeatherError, data: weather} = await getCurrentWeather(lat, lon)
    if(currentWeatherError) return console.log('Oh! ha ocurrido un error')
    configCurrentWeather(weather)
}