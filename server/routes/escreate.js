//ES作成のルーティング
var express = require('express');
var router = express.Router();
const { insertDB, getAllDocumentDB, deleteAllDocumentsDB } = require('../middlewares/db'); // DBモジュールをインポート
const { checkToken } = require('../middlewares/auth'); // 認証ミドルウェアをインポート
const { esCreateChat } = require('../middlewares/esChat'); // ES作成ミドルウェアをインポート


// ESの設定リクエストが来たら、DBに設定を保存
// req	esMode:ESの種類(例:自己PR)  esLength:ESの文字数 esCompany:ESの提出先企業　esQuestion:ESでの質問内容
// res	chatTextObj:AIからの返答テキスト
router.post('/setting', async (req, res) => {
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

			// ESの設定を元に、AIからの返答を作成
			const AIChatText = await esCreateChat(esSettingsObj.esLength, esSettingsObj.esCompany, esSettingsObj.esMode, esSettingsObj.esQuestion);

			// AIからの返答をDBに保存
			const chatAIObj = {
				chatText: AIChatText,// チャット本文
				sender: 'AI',// 送信者
				sendDate: new Date(),// 送信の日付
			};
			await insertDB(username, 'esChat', chatAIObj);// 引数 dbName:DB名 collectionName:コレクション名 esSettings:保存したい内容(JSON)

			// ESの設定を保存したら、AIからの返答をレスポンスとして返す
			res.json(chatAIObj);
		}
	} catch (error) {
		res.send('会話ができませんでした,再度同じ内容を送信してください');
	}
});

// AIとの会話リクエストが来たら、会話をDBに保存してAIからの返答を
// req	userChatText:ユーザーのAIへの会話テキスト
// res	AIChatText:AIの返答テキスト
router.post('/', async (req, res) => {
	const token = req.cookies.authToken;// ヘッダーのトークンを取得
	if (!token) {
		return res.send('ログインしてください');
	}
	try {
		const username = await checkToken(token);// ヘッダーのトークンを渡して、認証されたユーザーネームを受け取る
		if (username == null) {//ログインしていない場合
			res.send('ログインしてください');
		} else {
			//　ユーザーの送信内容をDBに保存
			const chatHumanObj = {
				chatText: req.body.UserChatText,// チャット本文
				sender: 'human',// 送信者
				sendDate: new Date(),// 送信の日付
			};
			await insertDB(username, 'esChat', chatHumanObj);// 引数 dbName:DB名 collectionName:コレクション名 esSettings:保存したい内容(JSON)

			// DBからESの設定を取得
			const esSettings = await getAllDocumentDB(username, 'esSettings');// 引数 DB名, コレクション名
			const esSettingsObj = esSettings[0];// ESの設定を取得

			// DBからこれまでの会話を取得
			const chatLog = await getAllDocumentDB(username, 'esChat');// 引数 DB名, コレクション名

			// これまでの会話をテキストに変換 (例: "AI:こんにちは\nユーザー:こんにちは")
			let chatLogText = "";
			chatLog.forEach((item) => {
				chatLogText += item.sender + ":" + item.chatText + "\n";
			});

			// ユーザーの送信内容をAIに送信して、返答を保存
			// 関数の引数には、ESの設定、これまでの会話を渡す(textMax, company, esMode, esQuestion, chatLog)
			const AIChatText = await esCreateChat(esSettingsObj.esLength, esSettingsObj.esCompany, esSettingsObj.esMode, esSettingsObj.esQuestion, chatLogText);

			// AIからの返答をDBに保存
			const chatAIObj = {
				chatText: AIChatText,// チャット本文
				sender: 'AI',// 送信者
				sendDate: new Date(),// 送信の日付
			};
			await insertDB(username, 'esChat', chatAIObj);// 引数 dbName:DB名 collectionName:コレクション名 esSettings:保存したい内容(JSON)

			// AIからの返答をレスポンスとして返す
			res.json(chatAIObj);
		}
	} catch (error) {
		res.send('会話ができませんでした,再度同じ内容を送信してください');
	}
});

// ES作成履歴の削除リクエストが来たら、DBの履歴を削除
// req	なし
// res　text:削除完了のテキスト
router.delete('/', async (req, res) => {
	const token = req.cookies.authToken;// ヘッダーのトークンを取得
	if (!token) {
		return res.send('ログインしてください');
	}
	try {
		const username = await checkToken(token);// ヘッダーのトークンを渡して、認証されたユーザーネームを受け取る
		if (username == null) {//ログインしていない場合
			res.send('ログインしてください');
		} else {
			// DBの会話履歴を削除
			await deleteAllDocumentsDB(username, 'esChat');// 引数 DB名, コレクション名

			// DBのES設定を削除
			await deleteAllDocumentsDB(username, 'esSettings');// 引数 DB名, コレクション名

			// AIからの返答をレスポンスとして返す
			res.send('ES作成履歴が削除されました');
		}
	} catch (error) {
		res.send('削除ができませんでした,再度同じ内容を送信してください');
	}
});

module.exports = router;