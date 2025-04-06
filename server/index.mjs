import dotenv from "dotenv";
dotenv.config({ path: './.env' }); 

import express from "express";
import analyzeRoute from "./routes/analyze.mjs"; 
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 

app.use("/analyze", analyzeRoute); 

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
