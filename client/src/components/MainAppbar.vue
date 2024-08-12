<!-- アプリバーのコンポーネント-->
<!-- 機能 -->
<!-- ナビゲーションバー 現在使用中の機能の表示(文字列) ログイン&サインイン ホームに戻る (左から順に) -->
<template>
	<v-app-bar color="primary">
		<template v-slot:append>
			<v-btn @click="singupDialog = true" class="account-btn">
				<v-icon left large>mdi-account-plus</v-icon>
				アカウント作成
			</v-btn>
			<v-btn @click="loginDialog = true" class="account-btn">
				<v-icon left large>mdi-login</v-icon>
				ログイン
			</v-btn>

			<v-btn>
				<v-icon left>
					mdi-home
				</v-icon>
			</v-btn>
		</template>

		<v-app-bar-title>
			Application
		</v-app-bar-title>

		<template v-slot:prepend>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>
		</template>

	</v-app-bar>

	<!-- ログインダイアログ-->
	<v-dialog v-model="loginDialog" persistent max-width="30em">
		<v-card>
			<v-card-title>
				<span class="headline">ログイン</span>
			</v-card-title>
			<v-card-text>
				<v-form @submit.prevent="login">
					<v-text-field v-model="loginID" label="ID" :disabled="isSubmit" class="text-input"
						clearable></v-text-field>
					<v-text-field v-model="loginPass" label="PassWord" :disabled="isSubmit" class="text-input" clearable
						:append-inner-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="hidePassword ? 'password' : 'text'"
						@click:append-inner="hidePassword = !hidePassword"></v-text-field>
					<v-btn type="submit" :loading="isSubmit" rounded="lg">送信</v-btn>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer>
					<div class="errorMsg"> {{ errorMessage }} </div>
				</v-spacer>
				<v-btn color="black" @click="loginDialog = false" :disabled="isSubmit">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<!-- アカウント作成ダイアログ-->
	<v-dialog v-model="singupDialog" persistent max-width="30em">
		<v-card class="signup-sheet">
			<v-card-title>
				<span class="headline">アカウント作成</span>
			</v-card-title>
			<v-card-text>
				<v-form @submit.prevent="singup">
					<v-text-field v-model="loginID" label="ID" :disabled="isSubmit" class="text-input"
						clearable></v-text-field>
					<v-text-field v-model="loginPass" label="PassWord" :disabled="isSubmit" class="text-input" clearable
						:append-inner-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="hidePassword ? 'password' : 'text'"
						@click:append-inner="hidePassword = !hidePassword"></v-text-field>
					<v-btn type="submit" :loading="isSubmit" rounded="lg" class="signup-sheet">送信</v-btn>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer>
					<div class="errorMsg"> {{ errorMessage }} </div>
				</v-spacer>
				<v-btn color="black" @click="singupDialog = false" :disabled="isSubmit">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
import { ref, } from 'vue';
import axios from 'axios';

const loginDialog = ref(false);//ログインダイアログの送信中
const singupDialog = ref(false);//サインアップダイアログの送信中
const loginID = ref('');
const loginPass = ref('');

const hidePassword = ref(true);//パスワードの非表示
const errorMessage = ref('');//ログイン不可の理由
const isSubmit = ref(false);//フォームを送信中

// ログイン情報を送るエンドポイント
const baseURL = process.env.VUE_APP_SERVER_BASEURL;
const backendEndUsers = `${baseURL}/users`;


///////未実装ログイン関数(トークン認証)
//ログイン情報をバックエンドに送る
async function login() {
	isSubmit.value = true;

	await axios.post(`${backendEndUsers}/login`, { id: loginID.value, password: loginPass.value })
		.then(response => {
			if (response.data.success) {//ログイン成功時
				alert(response.data.message);

				//ログイン画面を閉じる
				loginDialog.value = false;
				loginID.value = '';
				loginPass.value = '';
			} else {//ログイン失敗時
				errorMessage.value = response.data.message;
			}

		})
		.catch(error => {
			errorMessage.value = error;//データ取得やバックエンド接続失敗時
			console.log('ログインデータ取得失敗', error);
		});

	isSubmit.value = false;
}

///////未実装アカウント作成関数(トークン認証)
//アカウント登録情報をバックエンドに送る
async function singup() {
	isSubmit.value = true;

	await axios.post(`${backendEndUsers}/signup`, { id: loginID.value, password: loginPass.value })
		.then(response => {
			if (response.data.success) {//アカウント作成成功時
				alert(response.data.message);

				//アカウント作成画面を閉じる
				singupDialog.value = false;
				loginID.value = '';
				loginPass.value = '';
			} else {//アカウント作成失敗時
				errorMessage.value = response.data.message;
			}

		})
		.catch(error => {
			errorMessage.value = error;//データ取得やバックエンド接続失敗時
			console.log('アカウントデータ取得失敗', error);
		});

	isSubmit.value = false;
}
</script>

<style scoped>
.signup-sheet {
	background-color: #f8feff;
}

.text-input {
	margin-bottom: 1em;
}

.errorMsg {
	color: red;
}

.account-btn {
	display: flex;
	align-items: center;
	font-size: 1rem;
}

.account-btn .v-icon {
	margin-right: 0.2em;
}
</style>