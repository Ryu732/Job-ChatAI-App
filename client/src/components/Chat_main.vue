<!-- チャットの送受信コンポーネント-->
<!-- 送信ボタンを押すと、バックエンドにinputText(入力された会社名)とチェックがついている項目が渡される-->
<template>
	<div class="chat-container">
		<div class="chat-out">
			<div v-for="message in AIResMessages" :key="message.id" class="chat-message">
				{{ message.CompanyName }}<br />
				{{ message.AIRestext }}
			</div>
		</div>
		<form class="form-control" @submit.prevent="sendAI">
			<input type="text" v-model="inputText" placeholder="企業の名前を入力" class="col-md-11">
			<button type="submit" class="btn btn-secondary col-md-1" :disabled="isSubmit">送信</button>
		</form>
	</div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import axios from 'axios';

const props = defineProps({
	trueCheckList: Array, // チェックリストを親から受け取る
});

const inputText = ref('');//ユーザーから入力される会社名
const AIResMessages = ref([//AIから帰ってきた、出力
	{ id: 1, AIRestext: 'いちですそんあこんな\nだうえいふぁい', CompanyName: '' },
	{ id: 2, AIRestext: 'にーです', CompanyName: '' },
	{ id: 3, AIRestext: 'いちです', CompanyName: '' },
]);

// 入力した会社名を送るエンドポイント
const backendEndGemini = 'http://localhost:3000/gemini';

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

	//TODO checkListの中身の確認(console.log)とサーバーサイドにchecklistを送信が未実装

	//axiosを利用して、バックエンドへのデータの送受信
	await axios.post(backendEndGemini, promptMessgage)
		.then(response => {
			//チャット欄に返信内容を追加
			AIResMessages.value.push({
				id: AIResMessages.value.length + 1,
				CompanyName: inputText.value,
				AIRestext: inputText.value + response.data.resultText
			});
		})
		.catch(error => {
			alert('データの取得に失敗しました', error);
		});

	isSubmit.value = true;//フォーム送信中をオンにする
	inputText.value = '';//入力データの削除
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