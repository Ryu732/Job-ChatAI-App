//リクエストが来たら、DBに保存
//req	datebase:DB名 collection:コレクション名 saveQuery:保存したい内容(JSON)
//res	なし

var express = require('express');
var router = express.Router();
require('dotenv').config();

//接続情報
const { MongoClient } = require("mongodb");
const uri = process.env.mongoDB_Key;
const client = new MongoClient(uri);

router.post('/', async (req, res) => {
	try {
		// データベース、コレクションを指定
		const database = client.db('test');
		const collection = database.collection('test');

		// 指定された場所にデータを追加
		const saveQuery = req.body.saveQuery;

		await client.connect(); 
		await collection.insertOne(saveQuery);//データを追加

	} catch (error) {
		console.error('Error saving data:', error);
		res.status(500).send('エラーが発生し、データ保存ができませんでした');
	} finally{
		await client.close();
	}

})
module.exports = router;