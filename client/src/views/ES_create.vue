<template>
	<v-main>
		<v-container fluid fill-height class="main-content">
			<v-row class="fill-height">
				<v-col cols="12" md="2" class="fill-height modeChoice">
					<v-radio-group v-model="esMode">
						<v-radio label="学生時代頑張ったこと" value="schooldays"></v-radio>
						<v-radio label="自己PR" value="pr"></v-radio>
					</v-radio-group>
					<v-btn class="historyBtn">過去の履歴</v-btn>
				</v-col>
				<v-col cols="12" md="10" class="fill-height">
					<div class="chat-container">
						<div class="chat-out">
							<div v-for="message in messages" :key="message.id" class="chat-message"
								:class="{ 'user_hilight': message.sender === 'user' }">
								<p>{{ message.chatText }}</p>
							</div>
						</div>
						<v-form @submit.prevent="sendAI" class="input-form">
							<v-textarea v-model="inputText" :disabled="isSubmit" clearable auto-grow rows="1"
								class="text-input"></v-textarea>
							<v-btn @click="sendAI" :loading="isSubmit" rounded="lg" class="send-btn">送信</v-btn>
						</v-form>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>

<script setup>
import { ref, nextTick } from 'vue';
//import { useAuthStore } from '@/stores/authstore';
import axios from 'axios';

const esMode = ref(null);//選択中のESモード

const inputText = ref('');// ユーザーから入力される会社名
const messages = ref([// チャット画面に表示させる情報
	{
		id: 1,
		chatText: 'こんにちは',// チャットの内容
		sender: 'AI',// 送信者
	},
	{
		id: 2,
		chatText: 'ES作りたい!',// チャットの内容
		sender: 'user',// 送信者
	},
	{
		id: 3,
		chatText: '了解しました',// チャットの内容
		sender: 'AI',// 送信者
	},
]);

// 入力した会社名を送るエンドポイント
//const baseURL = process.env.VUE_APP_SERVER_BASEURL;

const isSubmit = ref(false);// バックエンドに送信中かどうか

// バックエンドへ生成AIのAPIを送受信
async function sendAI() {
	// 入力内容が空かどうかチェック
	if (esMode.value == null) {
		alert('左側からどんなエントリーシートを書くか選択してください');
		return;
	} else if (inputText.value.trim() === '') {
		alert('テキストが入力されていません');
		return;
	}

	isSubmit.value = true;// フォーム送信中をオンにする

	// axiosを利用して、バックエンドへのデータの送受信
	await axios.post()
		.then(async response => {
			// チャット欄に返信内容を追加
			messages.value.push({
				id: messages.value.length + 1,
				CompanyName: inputText.value,
				choiceCheckList: response.data.checkText,
				AIRestext: response.data.resultText
			});
			await nextTick();// DOMの更新待ち
			scrollToBottom();// チャットのスクロール
		})
		.catch(error => {
			alert('データの取得に失敗しました。再度お試しください', error);
		});

	isSubmit.value = false;// フォーム送信中をオンにする
	inputText.value = '';// 入力データの削除
}

// 一番下まで、チャット画面をスクロールする
function scrollToBottom() {
	const chatContainer = document.querySelector('.chat-out');
	chatContainer.scrollTop = chatContainer.scrollHeight;
}


</script>

<style scoped>
.chat-container {
	max-width: 100%;
	display: flex;
	flex-direction: column;
	height: 100%;
}


.chat-out {
	background-color: #e0e0e0;
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow-y: auto;
	padding: 1em;
	margin-bottom: 0.5em;
	border-radius: 0.5em;
}

.chat-message {
	background-color: rgb(197, 196, 196);
	padding: 1em;
	padding-left: 2em;
	padding-right: 2em;
	margin-bottom: 1.5em;
	border-radius: 1.2em;
	display: block;
	max-width: 70%;
	white-space: pre-wrap;
	word-wrap: break-word;
	align-self: flex-start;
}

.user_hilight {
	background-color: #d3eef7;
	align-self: flex-end;
	text-align: right;
}

.input-form {
	display: flex;
}

.v-main {
	height: calc(100vh - 4em);
	padding: 0;
	margin-top: 4em;
	background-color: #f8f9fa;
}

.main-content {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.fill-height {
	height: 100%;
}

.text-input {
	flex: 1;
	max-height: 40vh;
	overflow-y: auto;
}

.send-btn {
	height: calc(100% - 2.5vh);
}

.modeChoice {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.historyBtn {
	margin-bottom: 1.5em;
	width: 100%;
	align-self: flex-end;
}
</style>