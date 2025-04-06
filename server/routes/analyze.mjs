import express from "express";
import analyzeMood from "../utils/moodAnalyzer.mjs"; 
const router = express.Router();

router.post("/", async (req, res) => {
  const { entry } = req.body;

  if (!entry) {
    return res.status(400).json({ error: "No entry provided." });
  }

  try {
    const result = await analyzeMood(entry);
    console.log("Parsed AI response:", result);
    res.json(result);
  } catch (err) {
    console.error("Error analyzing mood:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

export default router;
