import React, { useState } from 'react';
import './App.css';
// import logo from './path/to/image.png';

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
//                <img src={logo} className="App-logo" alt="logo" />
    return (
        <div className="App">
            <header className="App-header">
                <h1>Forecaster</h1>
                <h2>Enter Location and time to get the weather</h2>
                <label htmlFor="forecast-date">Date:</label>
                <input type="date" id="forecast-date" name="forecast-date" />

                <label htmlFor="forecast-time">Time:</label>
                <input type="time" id="forecast-time" name="forecast-time" />

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Enter location"
                    />
                    <button type="submit">Submit</button>
                </form>
            </header>
        </div>
    );
}

export default App;