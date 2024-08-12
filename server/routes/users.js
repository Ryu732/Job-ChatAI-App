//リクエストが来たら、ログインまたはサインイン
//req	id:ユーザーID password:ユーザーのパスワード
//res	success:リクエストが成功したか(bool)　token:認証トークン　message:メッセージ(string)
const express = require('express');
const router = express.Router();
require('dotenv').config();
const { searchDocumentDB } = require('./db'); // データベースモジュールをインポート
const bcrypt = require('bcrypt');//ハッシュ化のライブラリ

//ログインリクエストが来た時の処理
router.post('/login', async (req, res) => {
	const loginId = req.body.id;
	const loginPassword = req.body.password;

	try {
		const searchId = await searchDocumentDB('users', 'loginData', 'id', loginId);//引数 DB名, コレクション名, 探したいフィールド, 探したいデータ

		if (searchId === null) {//一致するIDがなかった場合
			res.json({ success: false, token: '', message: 'IDが見つかりませんでした' });
		} else {//IDが見つかった場合
			const isPasswordMatch = await bcrypt.compare(loginPassword, searchId.password);// パスワードが一致するか確認

			if (isPasswordMatch) {//パスワードがあっていた(ログイン成功)
				res.json({ success: true, token: '', message: 'ログイン完了' });
			} else {//パスワードが違う
				res.json({ success: false, token: '', message: 'Passwordが違います' });
			}
		}
	} catch (error) {
		res.status(500).send('Error ログイン情報失敗', error);
	}

});

//アカウント作成リクエストが来た時の処理
router.post('/signup', async (req, res) => {
	const saltRounds = parseInt(process.env.hashsaltRounds, 10);//ハッシュ化時の追加文字列を、環境変数から読み込む

	const signupId = req.body.id;
	const hashPassword = await bcrypt.hash(req.body.password, saltRounds);//パスワードをハッシュ化
	const userLoginData = { id: signupId, password: hashPassword };

	try {
		const searchId = await searchDocumentDB('users', 'loginData', 'id', signupId);//引数 DB名, コレクション名, 探したいフィールド, 探したいデータ

		if (searchId === null) {//一致するIDがなかった場合
			//引数 dbName:DB名 collectionName:コレクション名 saveQuery:保存したい内容(JSON)
			await insertDB('users', 'loginData', userLoginData);
			res.json({ success: true, token: '', message: 'アカウントが作成されました' });

		} else {//IDが見つかった場合
			res.json({ success: false, token: '', message: '入力されたIDは、すでに使われています' });
		}
	} catch (error) {
		res.status(500).send('Error ログイン情報失敗', error);
	}

});

module.exports = router;