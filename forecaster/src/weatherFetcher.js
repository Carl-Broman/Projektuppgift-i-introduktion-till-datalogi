/*import dotenv from 'dotenv';
dotenv.config();*/

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

/**
 * Function that uses location and time to gather weather data and give that data to
 * chatGPT to write a short summary of it.
 * @param {String} location 
 * @param {String} time 
 * @param {String} date
 * @returns {String}
 */
export async function weatherData(date, time, location) {
    console.log(weatherApiKey)

    // First call to find coordinates of given location
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${weatherApiKey}`;

    // Wait for response before saving it as data
    const response = await fetch(geocodingUrl);
    const data = await response.json();

    // Saving both coordinates of the location as lat and lon constants
    const lat = data[0].lat.toString();
    const lon = data[0].lon.toString();

    console.log(lat, lon)

    // Switch case to find exclude information of other times
    /* ATTENTION NEEDS TO HAVE INPUT FROM USER BE CORRECT
    function timeAsked(time) {
        switch (time) {
            case "current":
                return 'minutely, hourly, daily';
            case "minutely":
                return 'current, hourly, daily';
            case "hourly":
                return 'current, minutely, daily';
            case "daily":
                return 'current, minutely, hourly';
        }
    }*/
    // Second call to find weather data for given location and time
    const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;



    fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      // call your function and pass the data as an argument
      console.log(data);
      return data;
    })
    .catch(error => {
      // handle any errors here
      console.error(error);
    });
}