var createSocket = function() {
    var s = new WebSocket($("#socket").data("ws-url"));
	s.onopen = function() {
		s.send('{"query":  "clusters"}');
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
		$("#clusters").append("<tr><td>" + value.provider + "</td><td><a href='/view/nodes/" + value.name + "'>" + value.name + "</td><td>" + value.count + "</td><td><form role='form' method='post'><input type='hidden' name='provider' value='" + value.provider + "'</input><div class='btn-group btn-group-xs' aria-label='...'><button name='name' value='" + value.name + "' formaction='/cluster/restart' class='btn btn-success'>Restart</button><button name='name' value='" + value.name + "' formaction='/cluster/terminate' class='btn btn-danger'>Terminate</button></div></form></td></tr>");
		});
		};
		append(message);
	};
	return s;
};

var socket = createSocket();
