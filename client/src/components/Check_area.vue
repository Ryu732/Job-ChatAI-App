<!-- チェックエリアのコンポーネント-->
<!-- 親にイベント呼び出しされるとcheckListのisCheckがtrueの部分を渡す-->
<!-- checkText, ischekをcheck_buttons(子)に渡す-->
<!-- ischeckが変更されると、バックエンドのリスト内容を変更-->

<template>
	<div>
		<h2 class="checkAreaHead">聞きたいことを選ぶ</h2>
		<Check v-for="item in checkList" :key="item.id" :checkText="item.checkText" :ischeck="item.ischeck"
			@changeCheck="changeIsCheck(item.id)" class="checkAreaList" />
	</div>
</template>

<script setup>
import { ref, defineEmits, watch, onMounted } from 'vue';
import Check from './check_button.vue';

const emit = defineEmits(['send-data']);

const checkList = ref([
	{ id: 1, checkText: '企業概要', ischeck: false },
	{ id: 2, checkText: '事業拠点', ischeck: false },
	{ id: 3, checkText: '主な事業', ischeck: true },
	{ id: 4, checkText: '関連企業', ischeck: false },
	{ id: 5, checkText: '上場市場', ischeck: false },
	{ id: 6, checkText: '子会社とその事業', ischeck: false },
	{ id: 7, checkText: '競合他社', ischeck: true },
]);

function sendIsCheckList() {
	const checkItems = checkList.value
		.filter(item => item.ischeck) // ischeckがtrueのものだけ取得
		.map(item => item.checkText);	// checkTextだけ取得
	emit('send-data', checkItems);
}

onMounted(() => { sendIsCheckList(); });
watch(() => checkList.value, sendIsCheckList, { deep: true });

function changeIsCheck(id) {
	const changeItem = checkList.value.find(item => item.id === id);
	if (changeItem) {
		changeItem.ischeck = !changeItem.ischeck;
	}
}
</script>

<style scoped>
.checkAreaList {
	line-height: 0;
	padding: 0%;
	margin: 0%;
}

.checkAreaHead {
	line-height: 2em;
}
</style>