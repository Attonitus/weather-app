export const API_KEY= '81098df81695a468495d8571cac872cf'
export const BASE_API = 'https://api.openweathermap.org/data/2.5/'

export const weatherConditionsCode = {
    //los id que se reciben van de 200 a 600 por tanto
    //se hará una conversión para hacerlos más sencillos
    //ej. 650 => 6, 305 => 3
    2: 'rainy',
    3: 'drizzle',
    5: 'rainy',
    6: 'drizzle',
    7: 'cloudy',
    8: 'clean',

}