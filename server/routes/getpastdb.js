var express = require('express');
var router = express.Router();
const { getAllDocumentDB } = require('../middlewares/db'); // DBモジュールをインポート
const { checkToken } = require('../middlewares/auth'); // 認証ミドルウェアをインポート


//過去のプロンプト履歴のリクエストが来たら
router.get('/', async (req, res) => {
	const token = req.cookies.authToken;
	if (!token) {
		return res.send('');
	}

	try {
		const username = await checkToken(token);//ヘッダーのトークンを渡して、認証されたユーザーネームを受け取る
		if (username === null) {
			res.send('');
		} else {
			res.json(await getAllDocumentDB(username, 'comQuestion'));
		}
	} catch (error) {
		res.send('');
	}
});

module.exports = router;