//リクエストが来たら、ログインまたはサインイン
//req	id:ユーザーID password:ユーザーのパスワード
//res	success:リクエストが成功したか(bool)　token:認証トークン　message:メッセージ(string)
const express = require('express');
const router = express.Router();
require('dotenv').config();
const { searchDocumentDB } = require('./db'); // データベースモジュールをインポート

//ログインリクエストが来た時の処理
router.post('/login', async (req, res) => {
	const loginId = req.body.id;
	const loginPassword = req.body.password;

	try {
		const searchId = await searchDocumentDB('users', 'loginData', 'id', loginId);//引数 DB名, コレクション名, 探したいフィールド, 探したいデータ

		if (searchId === null) {//見つからなかった場合
			res.json({ success: false, token: '', message: 'IDが見つかりませんでした' });
		} else {//IDが見つかった場合
			if (loginPassword === searchId.password) {//パスワードがあっていた(ログイン成功)
				res.json({ success: true, token: '', message: 'ログイン成功' });
			} else {//パスワードが違う
				res.json({ success: false, token: '', message: 'Passwordが違います' });
			}
		}
	} catch (error) {
		res.status(500).send('Error ログイン情報失敗', error);
	}

});

module.exports = router;