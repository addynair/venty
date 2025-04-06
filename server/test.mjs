import dotenv from "dotenv";
dotenv.config();
console.log("API Key:", process.env.GEMINI_API_KEY);

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello!");
    const response = result.response;
    const text = await response.text();
    console.log("Gemini Response:", text);
  } catch (err) {
    console.error("Error:", err);
  }
}

testGemini();
