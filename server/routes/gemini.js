// リクエストが来たら、Geminiに質問して、DBに質問内容を保存
// req	checkList:聞きたい項目の配列 inputText:ユーザーが入力した会社名
// res	checkText:聞きたい項目を一つの文字列化 resultText:AIからの出力 
const express = require('express');
const router = express.Router();
require('dotenv').config();
const { insertDB } = require('../middlewares/db'); // データベースモジュールをインポート
const { checkToken } = require('../middlewares/auth'); // 認証ミドルウェアをインポート
const { getCompanyInfo } = require('../middlewares/websearch_com'); // 認証ミドルウェアをインポート

// チェックリスト配列のテキスト部分のみを抽出して、一つの文字列にする
function pickCheckText(checkList) {
	let totalCheckText = '';
	for (const items of checkList) {
		totalCheckText += items + '  ';
	}
	return totalCheckText;
}

// リクエストが来た時の処理
router.post('/', async (req, res) => {
	try {
		const checkText = await pickCheckText(req.body.checkList);// 聞きたい項目を一つの文字列にしたやつ
		const username = await checkToken(req.cookies.authToken);// ヘッダーのトークンを渡して、認証されたユーザーネームを受け取る

		const resultText = await getCompanyInfo(req.body.inputText, req.body.checkList);

		const saveQuery = {
			CompanyName: req.body.inputText,
			choiceCheckList: checkText,
			AIRestext: resultText
		};
		if (username !== null) {// ユーザーネームが空じゃないなら(ログインしているなら)
			// ファイル保存のルートにリクエストを送信
			await insertDB(username, 'comQuestion', saveQuery);// 引数 dbName:DB名 collectionName:コレクション名 saveQuery:保存したい内容(JSON)
		}
		res.json({ resultText, checkText }); // JSON形式でレスポンスを返す
	} catch (error) {
		console.error('Error in backend:', error);
		res.status(500).send('Error generating content');
	}
});

module.exports = router;