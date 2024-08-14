import { createApp } from 'vue'
import App from './ChatComQuestionApp.vue'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'
import { loadFonts } from './plugins/webfontloader'

loadFonts()
const pinia = createPinia()

createApp(App)
	.use(vuetify)
	.use(pinia)
	.mount('#app')