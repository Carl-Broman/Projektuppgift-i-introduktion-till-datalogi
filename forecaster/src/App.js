import React, { useState } from 'react';
import './App.css';
import './weatherFetcher.js';
import './dalle.js';
import './chatgpt.js';

const weatherFetcher = require("./weatherFetcher");
const dalle = require("./dalle");
const chatgpt = require("./chatgpt");

function App() {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        location: '',
    });

    const [backgroundImage, setBackgroundImage] = useState(
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'
    );

    const [showPopup, setShowPopup] = useState(false);
    const [temperature, setTemperature] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    async function forecastCollecter(date, time, location) {
        const weatherResponse = await weatherFetcher.weatherData(date, time, location); // weatherResponse is json Object
        console.log(weatherResponse);
        const dalleResponse = await dalle.dallePicture(weatherResponse, location) // dalleResponse is url to picture currently set within dalle.js as 256x256 in quality
        console.log(dalleResponse);
        const chatGPTResponse = await chatgpt.chatMessage(weatherResponse, location); // chatGPTResponse is the answer from chatgpt in string
        console.log(chatGPTResponse);
        let setTempVariable = weatherResponse.main.temp-272.15
        setTemperature(setTempVariable.toFixed(2)); // Replace 'temperature' with the correct property name from the API response
        setBackgroundImage(dalleResponse);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Input value:', formData);
        const {date, time, location } = formData;
        forecastCollecter(date, time, location);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <header className="App-header">
                <h1>Forecaster</h1>
                <h2>Enter required information to forecast weather</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="forecast-date">Date:</label>
                        <input
                            type="date"
                            id="forecast-date"
                            value={formData.date}
                            onChange={handleChange}
                            name="date"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="forecast-time">Time:</label>
                        <input
                            type="time"
                            id="forecast-time"
                            value={formData.time}
                            onChange={handleChange}
                            name="time"
                            required
                        />
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
            {showPopup && <Popup temperature={temperature} onClose={closePopup} />}
        </div>
    );
}

function Popup({ temperature, onClose }) {
    return (
        <div className="popup">
            <div className="popup-content">
                <h3>Temperature</h3>
                <p>{temperature}°C</p> {/* Replace °C with the correct unit if needed */}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default App;