<!-- アプリバーのコンポーネント-->
<!-- ログイン&サインイン-->
<template>
	<v-app-bar color="primary">
		<template v-slot:append>
			<v-btn @click="loginDialog = true">
				login
			</v-btn>

			<v-btn>
				<v-icon>
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
</template>

<script setup>
import { ref, } from 'vue';
import axios from 'axios';

const loginDialog = ref(false);//ログインダイアログの送信中
const loginID = ref('');
const loginPass = ref('');

const hidePassword = ref(true);//パスワードの非表示
const errorMessage = ref('');//ログイン不可の理由
const isSubmit = ref(false);//フォームを送信中

// ログイン情報を送るエンドポイント
const baseURL = process.env.VUE_APP_SERVER_BASEURL;
const backendEndUsers = `${baseURL}/users`;



///////未実装ログイン関数
//ログイン情報をバックエンドに送る
async function login() {
	isSubmit.value = true;

	await axios.post(`${backendEndUsers}/login`, { id: loginID.value, password: loginPass.value })
		.then(response => {
			if (response.data.success) {//ログイン成功時

				alert("成功！");

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
</script>

<style scoped>
.login-dialog .v-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 4em;
}

.loginsheet {
	width: 100%;
	display: flex;
	flex-direction: column;
}

.text-input {
	margin-bottom: 1em;
}

.errorMsg {
	color: red;
}
</style>