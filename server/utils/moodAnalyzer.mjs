import dotenv from "dotenv";
dotenv.config();
console.log("Gemini API Key in moodAnalyzer.js:", process.env.GEMINI_API_KEY);
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function analyzeMood(entry) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });


  const prompt = `
    Analyze the mood of this journal entry and return the following:
    1. Overall sentiment (positive, neutral, or negative)
    2. Two-sentence summary of the entry
    3. One helpful suggestion to improve mental health

    Entry: ${entry}
  `;

  console.log("🧠 Prompt ready, sending to Gemini...");
  const result = await model.generateContent(prompt);
  console.log("✅ Response received from Gemini");

  const response = await result.response;
  const text = await response.text();


  return { result: text };
}
