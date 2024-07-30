<template>
	<div class="container">
		<div class="row">
			<div class="col-md-3">
				<Check @send-data="getCheckListTrue" />
			</div>
			<div class="col-md-7">
				<Chat :trueCheckList="trueCheckList" />
			</div>
			<div class="col-md-1">
				<p>ログインアイコン予定</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import Check from './components/CheckComponents/Check_area.vue';
import Chat from './components/Chat_main.vue';
import 'bootstrap/dist/css/bootstrap.css';
import{ ref } from 'vue';

const trueCheckList = ref([]);//チェックが入っているチェックリストのデータ

//送信ボタンが押されたらCheck_areaコンポーネントから、チェックが入っている配列を取得
function getCheckListTrue(checkList){
	trueCheckList.value = checkList;
}
</script>

<style>
body {
	background-color: #f8f9fa;
}
</style>