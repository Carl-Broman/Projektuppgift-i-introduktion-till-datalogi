const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export async function chatMessage(weather, location){
    const weatherQuestion = `Answer as if you are aware of the weather in ${location} as it is ${weather.weather.description} and ${weather.main.temp.toFixed(2)-272.15} degrees celsius. Write the information as if the user does not know and that you knew it before and recommend things to do there`
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: `Answer as if you are aware of the weather in ${location} as it is ${weather.main.temp.toFixed(2)-272.15} celsius and ${weather.weather.description}. Write the information as if the user does not know and that you knew it before and recommend things to do there`}],
      });

      return(completion.data.choices[0].message.content);
};