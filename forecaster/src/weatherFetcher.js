const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

/**
 * Function that uses location and time to gather weather data and returns json data to
 * work with for later
 * @param {String} location 
 * @param {String} time 
 * @param {String} date
 * @returns {String}
 */
export async function weatherData(date, time, location) {
    const dateString = date + "T" + time + ":00.000Z";
    const forecastMoment = new Date(dateString);
    console.log(forecastMoment.toISOString())

    // First call to find coordinates of given location
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${weatherApiKey}`;

    // Wait for response before saving it as data
    const response = await fetch(geocodingUrl);
    const data = await response.json();

    // Saving both coordinates of the location as lat and lon constants
    const lat = data[0].lat.toString();
    const lon = data[0].lon.toString();

    // Second call to find weather data for given location and time
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;

    const weatherRespone = await fetch(weatherUrl)
    const weatherData = await weatherRespone.json();
    let i = 0;
    while(i < weatherData.list.length){
        const compareTime = new Date(weatherData.list[i].dt_txt.replace(" ", "T") + ".000Z");
        if(compareTime > forecastMoment){
            return weatherData.list[i];
        }
        i++
    }
    return weatherData.list[weatherData.list.length - 1];
}
