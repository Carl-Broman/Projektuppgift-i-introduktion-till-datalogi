import dotenv from 'dotenv';
dotenv.config();

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

// Function which takes a location and time that later returns requested weatcher data
async function weatherData(location, time) {

    // First call to find coordinates of given location
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${weatherApiKey}`;

    // Wait for response before saving it as data
    const response = await fetch(geocodingUrl);
    const data = await response.json();

    // Saving both coordinates of the location as lat and lon constants
    const lat = data[0].lat.toString();
    const lon = data[0].lon.toString();

    const time = time.toString();

    // Switch case to find exclude information of other times
    // ATTENTION NEEDS TO HAVE INPUT FROM USER BE CORRECT
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
    }
    // Second call to find weather data for given location and time
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${timeAsked(time)}&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            // handle the response data here
            console.log(data);
        })
        .catch(error => {
            // handle any errors here
            console.error(error);
        });
}