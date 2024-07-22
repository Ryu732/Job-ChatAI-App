<!-- チャットの送受信コンポーネント-->
<!-- 送信ボタンを押すと、バックエンドにinputText(入力された会社名)が渡される-->
<template>
	<div class="chat-container">
		<div class="chat-out">
			<div v-for="message in AIResMessages" :key="message.id" class="chat-message"> {{ message.AIRestext }} </div>
		</div>
		<form class="form-control">
			<input type="text" v-model="inputText" @keydown.enter="sendAI" placeholder="企業の名前を入力" class="col-md-11">
			<button  @click="sendAI" class="btn btn-secondary col-md-1">送信</button>
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
	// エンドポイントのreqに会社名の情報を足す
	const url = `${backendEndGemini}?inputText=${encodeURIComponent(inputText.value)}`;
	alert(url);

	//axiosを利用して、バックエンドへのデータの送受信
	axios.get(url)
		.then(response => {
			alert(response.text);
		})
		.catch(error => {
			alert('データの取得に失敗しました', error);
		});

	//入力データの削除
	inputText.value = "";
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