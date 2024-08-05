//DB関係の関数を提供

//接続情報
const { MongoClient } = require("mongodb");
require('dotenv').config();
const uri = process.env.mongoDB_Key;
const client = new MongoClient(uri);


//DBにデータを保存
//引数	datebase:DB名 collection:コレクション名 saveQuery:保存したい内容(JSON)
async function insertDB(saveQuery){
	try {
		// データベース、コレクションを指定
		const database = client.db('test');
		const collection = database.collection('test');
		await client.connect(); 

		await collection.insertOne(saveQuery);//データを追加
	} catch (error) {
		console.error('Error saving data:', error);
		throw error;
	} finally{
		await client.close();
	}
}

//DBからコレクション内の全データを取得
//引数	datebase:DB名 collection:コレクション名
//戻り値　取得したJSONの配列
async function getAllDocumentDB(){
	try {
		// データベース、コレクションを指定
		const database = client.db('test');
		const collection = database.collection('test');
		await client.connect(); 

		const document = collection.find({});//データを追加
		return await document.toArray();//データを追加
	} catch (error) {
		console.error('Error saving data:', error);
		throw error;
	} finally{
		await client.close();
	}
}
module.exports = { insertDB, getAllDocumentDB };