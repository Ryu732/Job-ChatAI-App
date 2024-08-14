//認証関係の関数を提供
require('dotenv').config();
const jwt = require('jsonwebtoken');//JWTトークン発行ライブラリ
const tokenKey = process.env.JWT_SECRET;

//認証トークンの生成 
//引数　id:ユーザーID　戻り値:トークン(JSON)
function createToken(id) {
	return jwt.sign(
		{ id: id },
		tokenKey,
		{ expiresIn: '15d' } // トークンの有効期限
	);
}

//認証トークンの照合
//引数	authHeader:認証トークン　戻り値:ユーザーネーム
async function checkToken(token) {
	if (!token) { // トークンが存在しない場合
		return null;
	}

	try {
		const username = await new Promise((resolve, reject) => {
			jwt.verify(token, tokenKey, (err, decoded) => {
				if (err) {
					reject(null); // トークンが無効な場合はnullを返す
				} else {
					resolve(decoded.id); // トークンが有効な場合はユーザーIDを返す
				}
			});
		});
		return username;
	} catch (error) {
		return null;
	}
}

module.exports = { createToken, checkToken };