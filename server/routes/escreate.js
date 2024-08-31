//ES作成のルーティング
var express = require('express');
var router = express.Router();
const { insertDB } = require('../middlewares/db'); // DBモジュールをインポート
const { checkToken } = require('../middlewares/auth'); // 認証ミドルウェアをインポート


// ESの設定リクエストが来たら、DBに設定を保存
// req	esMode:ESの種類(例:自己PR)  esLength:ESの文字数 esCompany:ESの提出先企業　esQuestion:ESでの質問内容
// res	
router.get('/setting', async (req, res) => {
	const token = req.cookies.authToken;
	const esSettingsObj = req.body;
	if (!token) {
		return res.send('ログインしてください');
	}

	try {
		const username = await checkToken(token);// ヘッダーのトークンを渡して、認証されたユーザーネームを受け取る
		if (username == null) {//ログインしていない場合
			res.send('ログインしてください');
		} else {
			await insertDB(username, 'esSettings', esSettingsObj);// 引数 dbName:DB名 collectionName:コレクション名 esSettings:保存したい内容(JSON)

			//
			// ここにAIの次の処理を書く
			//
			//AIからの返答をレスポンスとして返す
		}
	} catch (error) {
		res.send('');
	}
});

// ESの設定リクエストが来たら、DBに設定を保存
// req	UserChatText:ユーザーのAIへの会話テキスト
// res	AIChatText:AIの返答テキスト
router.get('/', async (req, res) => {
	const token = req.cookies.authToken;
	if (!token) {
		return res.send('ログインしてください');
	}

	try {
		const username = await checkToken(token);// ヘッダーのトークンを渡して、認証されたユーザーネームを受け取る
		if (username == null) {//ログインしていない場合
			res.send('ログインしてください');
		} else {
			//　ユーザーの送信内容をDBに保存
			const insertDoc = {
				chatText: req.body.UserChatText,// チャット本文
				sender: 'human',// 送信者
				sendDate: new Date(),// 送信の日付
			};
			await insertDB(username, 'esCreateLog', insertDoc);// 引数 dbName:DB名 collectionName:コレクション名 esSettings:保存したい内容(JSON)


			// ユーザーの送信内容をAIに送信
			const AIChatText = 'AIの返答';
			res.json(AIChatText);
		}
	} catch (error) {
		res.send('');
	}
});


module.exports = router;