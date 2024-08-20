import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/AppHome.vue'
import ChatComQuestionApp from './views/ChatComQuestionApp.vue'
import ES_create from './views/ES_create.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/com_question',
		name: 'com_question',
		component: ChatComQuestionApp
	},
	{
		path: '/es',
		name: 'es',
		component: ES_create
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router;