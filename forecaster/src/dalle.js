const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Function taht uses json data for specific time and location to
 * create a picture using given weather conditions
 * @param {*} weatherResponse 
 */
export async function dallePicture(weatherResponse, location) {
    console.log(process.env.REACT_APP_OPENAI_API_KEY);
    try {
        const openai = new OpenAIApi(configuration);
        const response = await openai.createImage({
            prompt: `Realistic view of ${location} and the weather is ${weatherResponse.weather.description}`,
            n: 1,
            size: "256x256",
        });
        return response.data[0].url;
    }
    catch(err){
        console.error(err)
    }
}