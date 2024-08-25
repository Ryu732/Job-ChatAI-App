<!-- チャットの送受信コンポーネント-->
<!-- 送信ボタンを押すと、バックエンドにinputText(入力された会社名)とチェックがついている項目が渡される-->
<template>
	<div class="chat-container">
		<div class="chat-out">
			<v-expansion-panels v-model="isShowMessage" multiple>
				<v-expansion-panel v-for="message in AIResMessages" :key="message.id" class="chat-message">
					<v-expansion-panel-title>
						<h3>{{ message.CompanyName }}</h3>
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<h4>{{ message.choiceCheckList }}</h4>
						<p>{{ message.AIRestext }}</p>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</div>
		<v-form @submit.prevent="sendAI" class="input-form">
			<v-text-field v-model="inputText" label="企業の名前を入力" :disabled="isSubmit" class="text-input"
				clearable></v-text-field>
			<v-btn @click="sendAI" :loading="isSubmit" rounded="lg" class="send-btn">送信</v-btn>
		</v-form>
	</div>
</template>

<script setup>
import { ref, defineProps, onMounted, nextTick, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/authstore';
import axios from 'axios';

const authStore = useAuthStore();
const islogin = computed(() => authStore.isAuth);//ログインしているかどうか

const props = defineProps({
	trueCheckList: Array, // チェックリストを親から受け取る
});

const inputText = ref('');// ユーザーから入力される会社名
const AIResMessages = ref([// チャット画面に表示させる情報
	{
		id: 1,
		CompanyName: 'AIの入力がここに記述されます',
		choiceCheckList: '左の項目から選んで、会社名を送信してください',
		AIRestext: '',
	}
]);
const isShowMessage = ref([0]);// チャットの表示非表示

// 入力した会社名を送るエンドポイント
const baseURL = process.env.VUE_APP_SERVER_BASEURL;
const backendEndGemini = `${baseURL}/gemini`;
const backendEndPastdb = `${baseURL}/getpastdb`;

const isSubmit = ref(false);// バックエンドに送信中かどうか

// バックエンドへ生成AIのAPIを送受信
async function sendAI() {
	// 入力内容が空かどうかチェック
	if (inputText.value.trim() === '') {
		alert('企業名が入力されていません');
		return;
	}

	isSubmit.value = true;// フォーム送信中をオンにする
	// プロンプトをhttpリクエストに乗せるためのJSON
	const promptMessgage = {
		inputText: inputText.value,// 入力された会社名
		checkList: props.trueCheckList// チェックリストの会社
	};

	// axiosを利用して、バックエンドへのデータの送受信
	await axios.post(backendEndGemini, promptMessgage)
		.then(async response => {
			// チャット欄に返信内容を追加
			AIResMessages.value.push({
				id: AIResMessages.value.length + 1,
				CompanyName: inputText.value,
				choiceCheckList: response.data.checkText,
				AIRestext: response.data.resultText,
			});
			isShowMessage.value.push(AIResMessages.value.length + 1);// チャットのトグル表示を設定
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


onMounted(() => loginChat());// マウント時にAIResMessagesをDBから取得する
watch(islogin, () => loginChat());//ログイン状態が変更時に、チャットの内容も変える

async function loginChat() {
	if (islogin.value) {//ログインしているなら
		await axios.get(backendEndPastdb)
			.then(async response => {
				for (const doc of response.data) {
					//チャット欄にDBの内容を追加
					AIResMessages.value.push({
						id: AIResMessages.value.length + 1,
						CompanyName: doc.CompanyName,
						choiceCheckList: doc.choiceCheckList,
						AIRestext: doc.AIRestext,
					});
				}
				// チャットのトグル表示を設定(最新5件を表示)
				for (let i = AIResMessages.value.length - 5; i < AIResMessages.value.length; i++) {
					isShowMessage.value.push(i);
				}
				await nextTick();// DOMの更新待ち
				scrollToBottom();// チャットのスクロール
			})
			.catch(error => {
				console.log('DBのデータ取得失敗', error);
			});
	}
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
	background-color: #ecedee;
	flex: 1;
	overflow-y: auto;
	padding: 1em;
	margin-bottom: 0.5em;
	border-radius: 0.5em;
}

.chat-message {
	background-color: #ece9e9;
	padding: 1em;
	margin-bottom: 0.5em;
	border-radius: 0.5em;
}

.input-form {
	display: flex;
}

.text-input {
	flex: 1;
}

.send-btn {
	height: 70%;
}
</style>