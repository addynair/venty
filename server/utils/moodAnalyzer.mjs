import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function analyzeMood(entry) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
You are a helpful AI that analyzes daily journal entries. Return a JSON response like:
{
  "sentiment": "Positive/Negative/Neutral",
  "summary": "Two-sentence summary of the user's day.",
  "suggestion": "Helpful mental health suggestion."
}

ENTRY:
"""${entry}"""
`;

  const result = await model.generateContent(prompt);
  const text = await result.response.text(); 
  console.log("🧠 Gemini raw response:", text);

  try {
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);

    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (err) {
    console.error("❌ Failed to parse Gemini response:", err);
    return {
      sentiment: "Not available",
      summary: "Not available",
      suggestion: "Not available",
    };
  }
}
