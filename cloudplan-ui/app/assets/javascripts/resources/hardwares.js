var createSocket = function() {
    var s = new WebSocket($("#socket").data("ws-url"));
	s.onopen = function() {
		s.send('{"query":  "hardwares"}');
	};
	s.onclose = function() {

	};
	s.onerror = function(e) {
		console.log(e.data);
	};
	s.onmessage = function(msg) {
		var message = JSON.parse(msg.data);
		var append = function(data) {
		$.each(data, function(key, value) {
		$("#lol").append($('<li>',
		{ text: value.name }
		));
		});
		};
		append(message);
	};
	return s;
};

var socket = createSocket();
