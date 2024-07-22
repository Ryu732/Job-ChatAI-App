const express = require('express');
var router = express.Router();

//APIキーやモデルの設定などGeminiの準備
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.Gemini_Key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

//Geminiにプロンプトを送信
async function run() {
	const prompt = "Write a story about an AI and magic"
  
	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = await response.text();
	console.log(text);
}

router.get('/', async(req, res, next) => {
	res.send('respond with a resource');
	run();
});

module.exports = router;