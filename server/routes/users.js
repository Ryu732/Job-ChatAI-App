// リクエストが来たら、ログインまたはサインイン
// req	id:ユーザーID password:ユーザーのパスワード
// res	success:リクエストが成功したか(bool)　userId:ユーザーID　message:メッセージ(string)
const express = require('express');
const bcrypt = require('bcrypt');//ハッシュ化のライブラリ
const router = express.Router();
require('dotenv').config();
const { searchDocumentDB, insertDB } = require('../middlewares/db'); // DBミドルウェアをインポート
const { createToken } = require('../middlewares/auth'); // 認証ミドルウェアをインポート

// ログインリクエストが来た時の処理
router.post('/login', async (req, res) => {
	const loginId = req.body.id;
	const loginPassword = req.body.password;

	try {
		const searchId = await searchDocumentDB('users', 'loginData', 'id', loginId);// 引数 DB名, コレクション名, 探したいフィールド, 探したいデータ

		if (searchId === null) {// s一致するIDがなかった場合
			res.json({ success: false, userId: '', message: 'IDが見つかりませんでした' });
		} else {// IDが見つかった場合
			const isPasswordMatch = await bcrypt.compare(loginPassword, searchId.password);// パスワードが一致するか確認

			if (isPasswordMatch) {// パスワードがあっていた(ログイン成功)
				const token = createToken(loginId);
				res.cookie('authToken', token, {// 認証tokenをレスポンス
					httpOnly: true,
					secure: process.env.NODE_env === 'production',// 本番環境なら、httpsでしか接続できない
					maxAge: 15 * 24 * 60 * 60 * 1000 // 15日間有効
				});
				res.cookie('userId', loginId, {// ユーザーIDをレスポンス
					secure: process.env.NODE_env === 'production',
					maxAge: 15 * 24 * 60 * 60 * 1000 // 15日間有効
				});
				res.json({ success: true, userId: loginId, message: 'ログイン完了' });
			} else {// パスワードが違う
				res.json({ success: false, userId: '', message: 'Passwordが違います' });
			}
		}
	} catch (error) {
		res.status(500).json({ success: false, message: 'ログイン時にエラーが発生しました', error: error.message });
	}

});

// アカウント作成リクエストが来た時の処理
router.post('/signup', async (req, res) => {
	const saltRounds = parseInt(process.env.hashsaltRounds, 10);// ハッシュ化時の追加文字列を、環境変数から読み込む

	const signupId = req.body.id;
	const hashPassword = await bcrypt.hash(req.body.password, saltRounds);// パスワードをハッシュ化
	const userLoginData = { id: signupId, password: hashPassword };

	try {
		const searchId = await searchDocumentDB('users', 'loginData', 'id', signupId);// 引数 DB名, コレクション名, 探したいフィールド, 探したいデータ

		if (searchId === null) {// 一致するIDがなかった場合(作成できる)
			// 引数 dbName:DB名 collectionName:コレクション名 saveQuery:保存したい内容(JSON)
			await insertDB('users', 'loginData', userLoginData);
			const token = createToken(signupId);
			res.cookie('authToken', token, {// 認証tokenをレスポンス
				httpOnly: true,
				secure: process.env.NODE_env === 'production',// 本番環境なら、httpsでしか接続できない
				maxAge: 15 * 24 * 60 * 60 * 1000 // 15日間有効
			});
			res.cookie('userId', signupId, {// ユーザーIDをレスポンス
				secure: process.env.NODE_env === 'production',// 本番環境なら、httpsでしか接続できない
				maxAge: 15 * 24 * 60 * 60 * 1000 // 15日間有効
			});
			res.json({ success: true, userId: signupId, message: 'アカウントが作成されました' });
		} else {// IDが見つかった場合(作成できない)
			res.json({ success: false, userId: '', message: '入力されたIDは、すでに使われています' });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: 'アカウント作成時にエラーが発生しました', error: error.message });
	}
});

// ログアウト処理
router.get('/logout', async (req, res) => {
	res.clearCookie('authToken', { path: '/' });
	res.clearCookie('userId', { path: '/' });
	res.json({ success: true, message: 'ログアウトが完了しました' });
});
module.exports = router;