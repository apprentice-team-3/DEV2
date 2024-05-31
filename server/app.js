const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.post("/", async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `${req.body.value} 上記文章は日報です。これについて${req.body.order}の観点からレビューしてください。また太字のマークダウンの代わりに見出しや箇条書きを使って書いてください。改善点があれば具体的に記述してください`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  res.json({ generatedText: text });
});

http.createServer(app).listen(8000, () => {
  console.log("HTTP Server is running on port 8000");
});
