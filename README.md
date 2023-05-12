# Forecaster

### Weather application using chatGPT, Dall-E and weather API

#### Application description

Users can interact with a chatbot powered by Open AI, which can answer weather-related queries such as "What's the weather like in New York City?" or "What's the forecast for tomorrow in London?" The chatbot provides accurate and relevant responses based on the user's query. In addition to text-based responses, the application also uses Dall-E's API to generate weather-related images such as current weather conditions or weather-related objects like umbrellas or sunglasses. It does this by intercting with the weather APIs like OpenWeatherMap gather up-to-date weather information such as temperature, wind speed, humidity, and more. The backend processes the user's query, fetches the weather data, and generates a response using a combination of text and images.

#### How to access the application

Users can access the Weather application through cloning it form this github. They can then host the app locally or on an website. For this to work they should add an OpenAI API and an OpenWeather api to the .env.local. 

When you enter the host site, you will be presented by three input boxes of which you put in date, time and location. The program will, after a few seconds, create an AI written message about the weather at that time and the background will change to that location with said weather condition. 

#### Frameworks, libraries, methods etc

The Weather application is a web application that uses natural language processing, image generation, and weather APIs to provide users with accurate and interactive weather-related information. The Weather application is a web application that uses React for the front-end and Node.js with Express.js for the backend. 

The React front-end allows for an interactive and seamless user experience, with the chatbot and weather information displayed in a responsive and user-friendly interface. The backend processes the user's query, fetches the weather data, and generates a response using a combination of text and images.
