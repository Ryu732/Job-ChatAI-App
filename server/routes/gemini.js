const express = require('express');
const router = express.Router();
const cors = require('cors');//corsミドルウェアを追加

router.use(cors());//corsを使用


//APIキーやモデルの設定などGeminiの準備
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.Gemini_Key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

//Geminiにプロンプトを送信
async function run(inputText) {
	const prompt = inputText;
  
	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = await response.text();
	console.log(text);
}

router.get('/', async(req, res, next) => {
	console.log(req.query.inputText);
	run(req.query.inputText);
});

module.exports = router;