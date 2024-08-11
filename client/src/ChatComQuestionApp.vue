<template>
	<v-app>
		<AppBar />

		<v-main>
			<v-container fluid fill-height class="main-content">
				<v-row class="fill-height">
					<v-col cols="12" md="3" class="fill-height">
						<Check @send-data="getCheckListTrue" />
					</v-col>
					<v-col cols="12" md="9" class="fill-height">
						<Chat :trueCheckList="trueCheckList" />
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import AppBar from './components/MainAppbar.vue';
import Check from './components/Check_area.vue';
import Chat from './components/Chat_main.vue';
import { ref } from 'vue';

const trueCheckList = ref([]);

// 送信ボタンが押されたらCheck_areaコンポーネントから、チェックが入っている配列を取得
function getCheckListTrue(checkList) {
	trueCheckList.value = checkList;
}
</script>

<style>
body {
	background-color: #f8f9fa;
}

.v-application--wrap {
	min-height: 100vh;
}

.v-main {
	height: calc(100vh - 4em);
	padding: 0;
	margin-top: 4em;
}

.app-bar {
	height: 4em;
}

.main-content {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.fill-height {
	height: 100%;
}
</style>