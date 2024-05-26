import * as dotenv from "dotenv";
dotenv.config()
import { Agent } from "./Agent.js";
import { WeatherSearchTool } from "./WeatherSearchTool.js";

const agent = new Agent()
await agent.init({ apiKey: process.env.GEMINI_API_KEY, temperature: 0, tools: [WeatherSearchTool] })
const result = await agent.run('What is the weather in paris right now?', true)
console.log(result)