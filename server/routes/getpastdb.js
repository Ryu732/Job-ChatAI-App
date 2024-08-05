var express = require('express');
var router = express.Router();
const { getAllDocumentDB } = require('./db'); // データベースモジュールをインポート

//過去のプロンプト履歴のリクエストが来たら
router.get('/', async (req, res) => {
	try{
		res.json( await getAllDocumentDB() );
	}catch(error){
		res.send('過去の履歴がみれませんでした');
	}
});

module.exports = router;