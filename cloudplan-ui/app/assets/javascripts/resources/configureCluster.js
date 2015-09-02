var createSocket = function() {
    var s = new WebSocket($("#socket").data("ws-url"));
    var cluster = $("#socket").data("ws-cluster");
	s.onopen = function() {
		s.send('{"query":  "nodes", "filter": "' + cluster + '" }');
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
		$("#nodes").append("<tr><td>" + value.name + "</td><td><input type='checkbox' name='masters[]' value='" + value.privateIp + "'/></td><td><input type='checkbox' name='slaves[]' value='" + value.privateIp + "'/></td><td><input type='checkbox' name='namenodes[]' value='" + value.privateIp + "'/></td><td><input type='checkbox' name='datanodes[]' value='" + value.privateIp + "'/></td><td><input type='checkbox' name='journalnodes[]' value='" + value.privateIp + "'/></td><td><input type='checkbox' name='hmasters[]' value='" + value.privateIp + "'/></td><td><input type='checkbox' name='regionservers[]' value='" + value.privateIp + "'/></td><td><input type='checkbox' name='gmetads[]' value='" + value.privateIp + "'/></td><td><input type='checkbox' name='gmonds[]' value='" + value.privateIp + "'/></td><td><input type='checkbox' name='drivers[]' value='" + value.privateIp + "'/></td>");
		});
		};
		append(message);
	};
	return s;
};

var socket = createSocket();
