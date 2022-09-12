const defaultDateOptions = {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
}

//Formateamos la fecha
export function formatDate(date, config = defaultDateOptions) {
    return new Intl.DateTimeFormat('es', config).format(date);

}

//Formateamos la temperatura
export function formatTemp(value) {
    return `${Math.floor(value)}°`
}