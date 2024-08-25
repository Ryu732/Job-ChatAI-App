module.exports = function (io) {
	io.on('connection', (socket) => {
		console.log('a user connected');

		socket.on('chat message', (msg) => {
			console.log('message: ' + msg);
			io.emit('chat message', msg); // 全クライアントにメッセージを送信
		});

		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
};