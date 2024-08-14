import { defineStore } from 'pinia'

// クッキーを読み取る関数
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
	return null; // クッキーが見つからなかった場合は null を返す
}

export const useAuthStore = defineStore('auth', {
	state: () => ({
		userId: getCookie('userId'),
	}),
	actions: {
		login(userId) {
			this.userId = userId;
		},
		logout() {
			this.userId = null;
			document.cookie = 'userId=; Max-Age=0; path=/;'; // クッキーから userId を削除
		}
	},
	getters: {
		isAuth: (state) => !!state.userId,
	}
})