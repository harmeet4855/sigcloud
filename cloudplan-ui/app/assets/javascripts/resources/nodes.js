var createSocket = function() {
    var s = new WebSocket($("#socket").data("ws-url"));
	s.onopen = function() {
		s.send('{"query":  "nodes"}');
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
		$("#nodes").append("<tr><td>" + value.provider + "</td><td>"+ value.name + "</td><td>" + value.publicIp + "</td><td>" + value.location + "</td><td>" + value.hardware + "</td><td><form role='form' method='post'><input type='hidden' name='provider' value='" + value.provider + "'</input><input type='hidden' name='name' value='" + value.cluster + "'</input><div class='btn-group btn-group-xs' aria-label='...'><button name='node' value='" + value.name + "' formaction='/node/restart' class='btn btn-success'>Restart</button><button name='node' value='" + value.name + "' formaction='/node/terminate' class='btn btn-danger'>Terminate</button></div></form></td></tr>");
		});
		};
		append(message);
	};
	return s;
};

var socket = createSocket();
