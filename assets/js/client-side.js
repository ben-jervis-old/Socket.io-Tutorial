$(function () {
	var socket = io();
	$('form').submit(function () {
		var userName = $('#user-name').val();
		if(userName == "") {
			$('#user-name').addClass('invalid').focus();
		}
		else {
			$('#user-name').removeClass('invalid');
			var message = userName + ": " + $('#m').val();
			socket.emit('chat message', message);
			$('#m').val('');
		}

		
		return false;
	});
	socket.on('chat message', function (msg) {
		$('#messages').append($('<li class=\'list-group-item\'>').text(msg));
	});
	socket.on('system message', function (msg) {
		$('#messages').append($('<li class=\'list-group-item system-message\'>').text(msg))
	});
});
