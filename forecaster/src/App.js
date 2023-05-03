import React, { useState } from 'react';
import './App.css';

function App() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Input value:', inputValue);
        // Perform any necessary actions with the input value
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Forecaster</h1>
                <h2>Enter required imformation to forecast weather</h2>
                <div className="input-group">
                    <label htmlFor="forecast-date">Date:</label>
                    <input type="date" id="forecast-date" name="forecast-date" required />
                </div>
                <div className="input-group">
                    <label htmlFor="forecast-time">Time:</label>
                    <input type="time" id="forecast-time" name="forecast-time" required />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="forecast-location">Location:</label>
                        <input
                            type="text"
                            id="forecast-location"
                            value={inputValue}
                            onChange={handleChange}
                            placeholder="Enter location"
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