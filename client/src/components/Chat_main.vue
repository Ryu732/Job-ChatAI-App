<!-- チャットの送受信コンポーネント-->
<!-- 送信ボタンを押すと、バックエンドにinputText(入力された会社名)とチェックがついている項目が渡される-->
<template>
	<div class="chat-container">
		<div class="chat-out">
			<div v-for="message in AIResMessages" :key="message.id" class="chat-message">
				<h3>{{ message.CompanyName }}</h3><br />
				{{ message.choiceCheckList }}<br />
				{{ message.AIRestext }}
			</div>
		</div>
		<v-form @submit.prevent="sendAI" class="input-form">
			<v-text-field v-model="inputText" label="企業の名前を入力" :disabled="isSubmit" class="text-input"
				clearable></v-text-field>
			<v-btn @click="sendAI" :loading="isSubmit" rounded="lg" class="send-btn">送信</v-btn>
		</v-form>
	</div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
	trueCheckList: Array, // チェックリストを親から受け取る
});

const inputText = ref('');//ユーザーから入力される会社名
const AIResMessages = ref([//チャット画面に表示させる情報
	{
		id: 1,
		CompanyName: 'AIの入力がここに記述されます',
		choiceCheckList: '左の項目から選んで、会社名を送信してください',
		AIRestext: '',
	},
]);

// 入力した会社名を送るエンドポイント
const backendEndGemini = '${process.env.Server_BaseURL}/gemini';

const isSubmit = ref(false);//バックエンドに送信中かどうか

//バックエンドへ生成AIのAPIを送受信
async function sendAI() {
	//入力内容が空かどうかチェック
	if (inputText.value.trim() === '') {
		alert('企業名が入力されていません');
		return;
	}

	isSubmit.value = true;//フォーム送信中をオンにする
	//プロンプトをhttpリクエストに乗せるためのJSON
	const promptMessgage = {
		inputText: inputText.value,//入力された会社名
		checkList: props.trueCheckList//チェックリストの会社
	};

	//axiosを利用して、バックエンドへのデータの送受信
	await axios.post(backendEndGemini, promptMessgage)
		.then(response => {
			//チャット欄に返信内容を追加
			AIResMessages.value.push({
				id: AIResMessages.value.length + 1,
				CompanyName: inputText.value,
				choiceCheckList: response.data.checkText,
				AIRestext: response.data.resultText
			});
		})
		.catch(error => {
			alert('データの取得に失敗しました。再度お試しください', error);
		});

	isSubmit.value = false;//フォーム送信中をオンにする
	inputText.value = '';//入力データの削除
}

const backendEndPastdb = '${process.env.Server_BaseURL}/getpastdb';
// マウント時にAIResMessagesをDBから取得する
onMounted(async () => {
	await axios.get(backendEndPastdb)
		.then(response => {
			for (const doc of response.data) {
				//チャット欄にDBの内容を追加
				AIResMessages.value.push({
					id: AIResMessages.value.length + 1,
					CompanyName: doc.CompanyName,
					choiceCheckList: doc.choiceCheckList,
					AIRestext: doc.AIRestext
				});
			}

		})
		.catch(error => {
			console.log('DBのデータ取得失敗', error);
		});
});
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
	flex: 1;
	overflow-y: auto;
	padding: 1em;
	margin-bottom: 0.5em;
	border-radius: 0.5em;
}

.chat-message {
	background-color: rgb(197, 196, 196);
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