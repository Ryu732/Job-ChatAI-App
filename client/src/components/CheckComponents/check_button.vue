<!-- チェックボックスとそれに対応する文字を作成するコンポーネント-->
<!-- checkText, ischekを親から受け取る-->
<!-- ischeckが変更されると、親にchangeCheckのイベントハンドラー-->

<template>
	<div class="form-check form-switch">
		<input type="checkbox" v-model="ischeck" @change="$emit('changeCheck')" class="form-check-input">	
		<label class="form-check-label" for="flexSwitchCheckDefault">{{ checkText }}</label>
	</div>
</template>

<script setup>
import { ref , defineProps} from 'vue';

const props = defineProps([ 'checkText' , 'ischeck']);
const ischeck = ref(props.ischeck);
</script>

<style scoped>
.form-check{
	display: flex;
	align-items: center;
}
.form-check-input {
	margin-top: 0;
	margin-bottom: 0;
	margin-right: 0.5%;
}
</style>