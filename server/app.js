const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/users');
const geminiRouter = require('./routes/gemini');
const getPastdbRouter = require('./routes/getpastdb');
const escreate = require('./routes/escreate');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/public/dist')));

app.use('/users', usersRouter);
app.use('/gemini', geminiRouter);
app.use('/getpastdb', getPastdbRouter);
app.use('/escreate', escreate);


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/public/dist', 'index.html'));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// HTTPサーバーとSocket.ioの設定
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

require('./io-event/eschat-event')(io);//eschat-event.jsを読み込む

module.exports = { app, server };  // appとserverの両方をエクスポート
