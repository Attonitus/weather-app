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

export function formatWeekList(rawData) {
    let dayList = []
    const weeklist = []
    rawData.forEach((item, index) => {
        dayList.push(item)
        if((index + 1) % 8 === 0) {
            weeklist.push(dayList)
            dayList = []
        }
    })
    return weeklist
}