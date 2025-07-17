import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const HF_API_URL =
  "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base";

export default async function analyzeMood(entry) {
  try {
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: entry }),
    });

    const data = await response.json();

    console.log("📦 Hugging Face response:", JSON.stringify(data));

    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      throw new Error("Invalid response format from Hugging Face");
    }

    const top = data[0].reduce(
      (max, curr) => (curr.score > max.score ? curr : max),
      data[0][0]
    );

    const label = top.label || "Unknown";

    return {
      sentiment: label,
      summary: "You shared a reflection related to " + label.toLowerCase(),
      suggestion: getSuggestion(label),
    };
  } catch (err) {
    console.error("❌ Hugging Face API error:", err);
    return {
      sentiment: "Not available",
      summary: "Something went wrong.",
      suggestion: "Please try again later.",
    };
  }
}

function getSuggestion(label) {
  const suggestions = {
    joy: "Celebrate your good moments! Share them with someone you love.",
    sadness: "Try writing about what made you sad or take a short walk.",
    anger: "Take deep breaths or journal your thoughts to release tension.",
    fear: "Remind yourself that it's okay to be scared. Grounding exercises can help.",
    surprise: "Reflect on what surprised you — was it positive or negative?",
    disgust:
      "Try to distance yourself mentally and reflect later with clarity.",
    neutral: "Keep observing and journaling. It's okay to feel steady.",
  };

  return (
    suggestions[label.toLowerCase()] ||
    "Take a moment to reflect on this emotion."
  );
}
