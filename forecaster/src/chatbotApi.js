require("dotenv").config();
const openai = require("openai");
const fetchWeatherData = require("./weatherApi");

const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;
const openaiEndpoint = "https://api.openai.com/v1/engines/davinci-codex/completions";

const prompt = "Find the location and time in the following message: ";

async function chatbotApi(input) {
  const message = prompt + input;
  const params = {
    prompt: message,
    max_tokens: 100,
    temperature: 0.7,
    n: 1,
    stop: "\n",
  };

  const client = new openai.OpenAI(openaiApiKey);
  const completions = await client.completions.create(openaiEndpoint, params);
  const { choices } = completions.data;
  const { text } = choices[0];

  const { location, time } = extractLocationAndTime(text);

  if (location && time) {
    return fetchWeatherData(location, time);
  } else {
    return "Sorry, I could not find any location or time in your message.";
  }
}

function extractLocationAndTime(text) {
  const locationRegex = /in (.+)/i;
  const timeRegex = /at (.+)/i;

  const locationMatch = text.match(locationRegex);
  const timeMatch = text.match(timeRegex);

  const location = locationMatch ? locationMatch[1] : null;
  const time = timeMatch ? timeMatch[1] : null;

  return { location, time };
}

module.exports = chatbotApi;
