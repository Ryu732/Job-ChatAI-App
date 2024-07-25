<!-- チャットの送受信コンポーネント-->
<!-- 送信ボタンを押すと、バックエンドにinputText(入力された会社名)が渡される-->
<template>
	<div class="chat-container">
		<div class="chat-out">
			<div v-for="message in AIResMessages" :key="message.id" class="chat-message"> {{ message.AIRestext }} </div>
		</div>
		<form class="form-control" @submit.prevent="sendAI">
			<input type="text" v-model="inputText"  placeholder="企業の名前を入力" class="col-md-11">
			<button type="submit" class="btn btn-secondary col-md-1">送信</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const inputText = ref('');//ユーザーから入力される会社名
const AIResMessages = ref([//AIから帰ってきた、出力
	{ id: 1, AIRestext: 'いちですそんあこんな\nだうえいふぁい' },
	{ id: 2, AIRestext: 'にーです' },
	{ id: 3, AIRestext: 'いちです' },
]);

// 入力した会社名を送るエンドポイント
const backendEndGemini = 'http://localhost:3000/gemini';


//バックエンドへ生成AIのAPIを送受信
async function sendAI() {
	//プロンプトをhttpリクエストに乗せるためのJSON
	const promptMessgage = {
		inputText: inputText.value,
	};

	//axiosを利用して、バックエンドへのデータの送受信
	axios.post(backendEndGemini, promptMessgage)
		.then(response => {
			console.log(response.data.resultText);

			//チャット欄に返信内容を追加
			AIResMessages.value.push({
				id: AIResMessages.value.length + 1,
				AIRestext: inputText.value + response.data.resultText
			});
		})
		.catch(error => {
			console.log('データの取得に失敗しました', error);
		});

	//入力データの削除
	inputText.value = '';
}
</script>

<style scoped>
.chat-container {
	height: 100vh;
	display: flex;
	flex-direction: column;
}

.chat-out {
	background-color: #f0f0f0;
	flex: 1;
	overflow-y: auto;
	padding: 1em;
}

.chat-message {
	background-color: rgb(207, 207, 207);
	padding: 1em;
	margin-bottom: 0.5em;
	border-radius: 0.5em;
}
</style>