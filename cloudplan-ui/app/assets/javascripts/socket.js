var createSocket = function() {
    var s = new WebSocket($("#socket").data("ws-url"));
	s.onopen = function() {
		s.send('{"task": "Ready"}');
		$("#status").text("Waiting").toggleClass("label-default");
	};
	s.onclose = function() {
		$("#status").text("Completed").toggleClass("label-success");
		$("#kill").hide();
		$("#redirect").show();
		$(location).attr('href', $("#redirect").data("ws-redirect"));
	};
	s.onerror = function(e) {
		$("#status").text("Error").toggleClass("label-danger");
		console.log(e.data);
	};
	s.onmessage = function(msg) {
		$("#status").text("Running").toggleClass("label-warning");
		var message = JSON.parse(msg.data);
		if (message.running) {
            $("#logs").append(
            '<li class="list-group-item">' +
            '<span id="' + message.task + '-tick" class="pull-right glyphicon glyphicon-ok" aria-hidden="true"></span>' +
            '<div id="' + message.task + '-loader" class="pull-left spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' +
            message.description +
            '</li>');
            $("#" + message.task + "-tick").hide();
            $("#" + message.task + "-loader").show();
        } else {
            $("#" + message.task + "-tick").show();
            $("#" + message.task + "-loader").hide();
        }
	};
	return s;
};

var socket = createSocket();
