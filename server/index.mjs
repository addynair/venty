import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import analyzeRoute from "../routes/analyze.mjs";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use("/analyze", analyzeRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
