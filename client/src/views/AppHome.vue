<template>
	<v-main>
		<v-container>
			<v-row justify="center">
				<div class="home_title">
					<h1>就活支援アプリへようこそ</h1>
					<p>このサイトでは、以下の機能が使えます</p>
				</div>
			</v-row>
			<v-row>
				<v-col>
					<v-card @click="router.push('/com_question')">
						<v-card-title>会社質問</v-card-title>
						<v-card-text>
							<p>会社情報の検索をAIがサポートしてくれます</p>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col>
					<v-card @click="router.push('/es')">
						<v-card-title>エントリーシート作成</v-card-title>
						<v-card-text>
							<p>ESの作成をAIがサポートしてくれます</p>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col>
					<v-card>
						<v-card-title>メモ</v-card-title>
						<v-card-text>
							<p>就活イベントのメモを作ろう!</p>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter();


</script>

<style scoped>
.v-main {
	margin-top: 5em;
	height: calc(100vh - 5em);
	background-color: #f8f9fa;
}

.home_title {
	text-align: center;
}
</style>