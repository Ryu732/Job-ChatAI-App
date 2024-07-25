const express = require('express');
const router = express.Router();
require('dotenv').config();


//APIキーやモデルの設定などGeminiの準備
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.Gemini_Key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//Geminiにプロンプトを送信
async function run(inputText) {
	try {
		const prompt = inputText;

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();
		return (text);
	} catch (error) {
		console.error('Error generating content:', error);
		throw error;
	}
}

router.post('/', async (req, res) => {
	try {

		const resultText = await run(req.body.inputText);
		console.log('Backend response:', resultText); // レスポンスをログに出力
		res.json({ resultText }); // JSON形式でレスポンスを返す
	} catch (error) {
		console.error('Error in backend:', error);
		res.status(500).send('Error generating content');
	}
});

module.exports = router;