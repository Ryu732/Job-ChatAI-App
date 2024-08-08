<!-- アプリバーのコンポーネント-->
<!-- ログイン-->
<template>
	<v-app-bar color="primary">
		<template v-slot:append>
			<v-btn @click="loginDialog = true">
				login/signIn
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
						:append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword ? 'password' : 'text'"
						@click:append-inner="showPassword = !showPassword"></v-text-field>
					<v-btn type="submit" :loading="isSubmit" rounded="lg">送信</v-btn>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer>
					<div class="errorMsg"> {{ errorMessage }} </div>
				</v-spacer>
				<v-btn color="black" @click="loginDialog = false">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
import { ref, } from 'vue';

const loginDialog = ref(false);
const loginID = ref('');
const loginPass = ref('');

const showPassword = ref(true);
const errorMessage = ref('');

async function login() {

	//ログイン画面を閉じる
	loginDialog.value = false;
	loginID.value = '';
	loginPass.value = '';
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