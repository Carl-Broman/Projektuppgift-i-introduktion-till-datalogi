import React, { useState } from 'react';
import './App.css';
import './weatherFetcher.js';

const weatherFetcher = require ("./weatherFetcher");

function App() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  async function forecastCollecter(date, time, location){
    const weatherResponse = await weatherFetcher.weatherData(date, time, location)
    console.log(weatherResponse);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Input value:', formData);
    const {date, time, location } = formData;
    forecastCollecter(date, time, location);
    // Perform any necessary actions with the input value
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Forecaster</h1>
        <h2>Enter required imformation to forecast weather</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="forecast-date">Date:</label>
            <input
              type="date"
              id="forecast-date"
              value={formData.date}
              onChange={handleChange}
              name="date"
              required />
          </div>
          <div className="input-group">
            <label htmlFor="forecast-time">Time:</label>
            <input
              type="time"
              id="forecast-time"
              value={formData.time}
              onChange={handleChange}
              name="time"
              required />
          </div>
          <div className="input-group">
            <label htmlFor="forecast-location">Location:</label>
            <input
              type="text"
              id="forecast-location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              name="location"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;