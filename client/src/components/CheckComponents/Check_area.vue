<!-- チェックエリアのコンポーネント-->
<!-- 親にイベント呼び出しされるとcheckListのisCheckがtrueの部分を渡す-->
<!-- checkText, ischekをcheck_buttons(子)に渡す-->
<!-- ischeckが変更されると、バックエンドのリスト内容を変更-->

<template>
	<h2 class="checkAreaHead">聞きたいことを選ぶ</h2>
	<Check 
		v-for="item in checkList" 
		:key="item.id" 
		:checkText="item.checkText"
		:ischeck="item.ischeck"
		@changeCheck="changeIsCheck(item.id)"
		class="checkAreaList"
	></Check>
</template>

<script setup>
import{ ref, defineEmits, watch} from 'vue';
import Check from './check_button.vue';

const emit = defineEmits(['send-data']);

//チェック項目のリスト
const checkList = ref([
	{ id: 1, checkText: '企業概要', ischeck: false},
	{ id: 2, checkText: '従業員数', ischeck: true},
	{ id: 3, checkText: '主な事業', ischeck: false},
	{ id: 4, checkText: '関連企業', ischeck: false},
	{ id: 5, checkText: '上場市場', ischeck: false},
	{ id: 6, checkText: '社長挨拶', ischeck: false},
	{ id: 7, checkText: '業界内での立ち位置と競合他社', ischeck: false},
]);

//呼び出されたらcheckListのisCheckがtrueの部分を返す
function sendIsCheckList(){
	const checkItems = checkList.value.filter(item => item.ischeck);
	emit('send-data', checkItems);
}

//チェックが変更されたら親に通知する
watch(() => checkList.value, sendIsCheckList, { deep: true });


//子のチェックが変更されたときに処理
function changeIsCheck(id){
	const changeItem = checkList.value.find(item => item.id === id);
	if(changeItem){
		changeItem.ischeck = !changeItem.ischeck;//配列のチェックを変更
	}
}

</script>

<style scoped>
.checkAreaList{
	line-height: 3;
}
.checkAreaHead{
	line-height: 2;

}
</style>