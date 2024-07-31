const express = require('express');
const router = express.Router();
require('dotenv').config();


//APIキーやモデルの設定などGeminiの準備
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.Gemini_Key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//Geminiにプロンプトを送信
async function sendGemini(inputText, checkText) {
	try {
		const prompt = inputText + checkText;

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();
		return (text);
	} catch (error) {
		console.error('Error generating content:', error);
		throw error;
	}
}

//チェックリスト配列のテキスト部分のみを抽出して、一つの文字列にする
function pickCheckText(checkList){
	let totalCheckText = '';
	for(const items of checkList){
		totalCheckText += items.checkText + ',';
	}
	return totalCheckText;
}

router.post('/', async (req, res) => {

	const checkText = pickCheckText(req.body.checkList);//聞きたい項目を一つの文字列にしたやつ
	try {
		const resultText = await sendGemini(req.body.inputText, checkText);
		console.log('Backend response:', resultText); // レスポンスをログに出力
		res.json({ resultText }); // JSON形式でレスポンスを返す
	} catch (error) {
		console.error('Error in backend:', error);
		res.status(500).send('Error generating content');
	}
});

module.exports = router;