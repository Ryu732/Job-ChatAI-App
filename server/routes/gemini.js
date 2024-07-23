const express = require('express');
const router = express.Router();
require('dotenv').config();


//APIキーやモデルの設定などGeminiの準備
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.Gemini_Key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//Geminiにプロンプトを送信
async function run(inputText) {

	const prompt = inputText;

	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();
	console.log(text);
	return (text);
}

router.get('/', async (req, res, next) => {
	const resultText = await run(req.query.inputText);
	res.send(resultText);
});

module.exports = router;