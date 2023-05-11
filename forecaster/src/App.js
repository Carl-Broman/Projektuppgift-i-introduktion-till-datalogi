import React, { useState } from 'react';
import './App.css';
import weatherFetcher from './weatherFetcher';
import dalle from './dalle';
import chatgpt from './chatgpt';

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

    async function forecastCollector(date, time, location) {
        const weatherResponse = await weatherFetcher.weatherData(date, time, location);
        console.log(weatherResponse);
        const dalleResponse = await dalle.dallePicture(weatherResponse, location);
        console.log(dalleResponse);
        const chatGPTResponse = await chatgpt.chatMessage(weatherResponse, location);
        console.log(chatGPTResponse);
        const setTempVariable = weatherResponse.main.temp - 272.15;
        setTemperature(setTempVariable.toFixed(2));
        setBackgroundImage(dalleResponse);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Input value:', formData);
        const { date, time, location } = formData;
        await forecastCollector(date, time, location);
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