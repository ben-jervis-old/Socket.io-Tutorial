var express = require('express');
var app = express();
var http = require('http').Server(app);
const path = require('path');
var io = require('socket.io')(http);

app.use(express.static('assets'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', function (socket) {
	io.emit('system-message', 'A new user has connected');
	socket.on('disconnect', function () {
		io.emit('system-message', 'A user has disconnected');
	});
	socket.on('chat message', function (msg) {
		io.emit('chat message', msg);
	});
});

http.listen(3000, function () {
	console.log('listening on *:3000');
});

console.log(path.join(__dirname, '/client-side.js'));
