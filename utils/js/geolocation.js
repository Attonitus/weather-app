//Función que devuelve si la geolocalización está disponible
//en el navegador
function geolocationSupport() {
    // if('geolocation' in navigator){
    //     return true
    // }
    // return false
    return 'geolocation' in navigator
}

const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 100000,
}

export function getCurrentPosition(options = defaultOptions){
    if(!geolocationSupport()) throw new Error('No hay soporte de geolocalización en tu navegador... :c');

    //Las Promesas nos ayudan a poder ejecutar operaciones asincronas
    return new Promise((resolve, reject)=> {
        //Guardamos las coordenadas en variables
        navigator.geolocation.getCurrentPosition( (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            //En caso de que la promesa sea exitosa devolvemos
            //las variables lat y lon, pero resolve sólo
            //acepta un parametro, por tanto lo ponemos en un objeto
            resolve(position)
        }, () => {
            reject(new Error('no hemos podido obtener tu ubicación'))
        }, options)
    })
}


export async function getLatLon(options = defaultOptions){
    try {
        const {coords: {latitude: lat, longitude: lon}} = await getCurrentPosition(options)
        return{lat, lon, isError: false}
    } catch {
        return {isError: true, lat: null, lon: nun}
    }

    }