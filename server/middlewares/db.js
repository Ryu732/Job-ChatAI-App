// DB関係の関数を提供
// 接続情報
const { MongoClient } = require("mongodb");
require('dotenv').config();
const uri = process.env.mongoDB_Key;
const client = new MongoClient(uri);


// DBにデータを保存
// 引数	dbName:DB名 collectionName:コレクション名 saveQuery:保存したい内容(JSON)
async function insertDB(dbName, collectionName, saveQuery) {
	try {
		// データベース、コレクションを指定
		await client.connect();
		const database = client.db(dbName);
		const collection = database.collection(collectionName);

		await collection.insertOne(saveQuery);//データを追加
	} catch (error) {
		console.error('データの保存失敗:', error);
		throw error;
	} finally {
		await client.close();
	}
}

// DBからコレクション内の全データを取得
// 引数	dbName:DB名 collectionName:コレクション名
// 戻り値　取得したJSONの配列
async function getAllDocumentDB(dbName, collectionName) {
	try {
		// データベース、コレクションを指定
		await client.connect();
		const database = client.db(dbName);
		const collection = database.collection(collectionName);

		const document = collection.find({});//データを追加
		return await document.toArray();//データを追加
	} catch (error) {
		console.error('データ取得失敗:', error);
		throw error;
	} finally {
		await client.close();
	}
}

// DBからコレクション内のデータを検索
// 引数	dbName:DB名 collectionName:コレクション名 searchField: 探したいフィールド searchData:探したいデータ
// 戻り値　見つかったデータ(発見できなかった場合は、'見つかりませんでした'を返す)
async function searchDocumentDB(dbName, collectionName, searchField, searchData) {
	try {
		// データベース、コレクションを指定
		await client.connect();
		const database = client.db(dbName);
		const collection = database.collection(collectionName);

		const query = { [searchField]: searchData };

		const document = await collection.findOne(query, { projection: { _id: 0 } });//データを検索

		// 見つかったデータを返す。見つからなかった場合はnullを返す
		return document ? document : null;

	} catch (error) {
		console.error('検索中にエラーが発生', error);
		throw error;
	} finally {
		await client.close();
	}
}
module.exports = { insertDB, getAllDocumentDB, searchDocumentDB };