function getWeather(location, time) {
  const currentTime = new Date().toLocaleTimeString();
  console.log(`The weather in ${location} at ${time} is ${currentTime}.`);
}

module.exports = { getWeather };
