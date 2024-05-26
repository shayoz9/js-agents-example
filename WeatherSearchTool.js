import { DynamicStructuredTool } from "langchain/tools";
import { z } from "zod";
import axios from "axios";

export const WeatherSearchTool = new DynamicStructuredTool({
    name: "weather_search", // this is how the LLM will call your tool
    description: "searches for weather information according to city", // IMPORTANT! this is how the LLM knows when to call the tool, using the description the LLM knows in what cases to call the tool
    schema: z.object({ // we need to describe the schema of the input data required to run this tool, once it is called the input will be structured accordingly 
        country: z.string().describe("the ISO 3166 3 letters country code"),
        city: z.string().describe("the city name"),
    }),
    func: async ({ country, city }) => { // the actual funciton to run when calling the tool
        try {
            const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city},${country}&appid=${process.env.WEATHER_API_KEY}`)

            // the return value it returned to the LLM to continue processing 
            return `tempeture: ${result.data.main.temp} feels like: ${result.data.main.feels_like} weather: ${result.data.weather[0].description}`;
        } catch (e) {
            console.log(e)
            return 'no information found'
        }
    },
});
