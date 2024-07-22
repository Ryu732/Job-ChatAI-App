<template>
	<div class="container">
		<div class="row">
			<div class="col-md-3">
				<Check/>
			</div>
			<div class="col-md-7">
				<Chat/>
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
</script>

<style>
body {
	background-color: #f8f9fa;
}
</style>