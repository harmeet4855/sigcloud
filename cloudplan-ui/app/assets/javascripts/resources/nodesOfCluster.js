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
		$("#nodes").append("<tr><td>" + value.name + "</td><td>" + value.publicIp + "</td><td>" + value.location + "</td><td>" + value.hardware + "</td><td><form role='form' method='post'><input type='hidden' name='provider' value='" + value.provider + "'</input><input type='hidden' name='name' value='" + value.cluster + "'</input><div class='btn-group btn-group-xs' aria-label='...'><button name='node' value='" + value.name + "' formaction='/node/restart' class='btn btn-success'>Restart</button><button name='node' value='" + value.name + "' formaction='/node/terminate' class='btn btn-danger'>Terminate</button></div></form></td></tr>");
		});
		};
		append(message);
	};
	return s;
};

var socket = createSocket();

var createMesosSocket = function() {
    var s = new WebSocket($("#socket").data("ws-url"));
    var cluster = $("#socket").data("ws-cluster");
	s.onopen = function() {
		s.send('{"query":  "mesos", "filter": "' + cluster + '" }');
	};
	s.onclose = function() {

	};
	s.onerror = function(e) {
		console.log(e.data);
	};
	s.onmessage = function(msg) {
		var message = JSON.parse(msg.data);
		console.log(message);
		appendMesosMaster(message.masters, "mesos-masters");
		appendNodeService(message.slaves, "mesos-slaves");
        appendHdfsNamenode(message.namenodes, "hdfs-namenodes");
        appendNodeService(message.datanodes, "hdfs-datanodes");
        appendNodeService(message.journalnodes, "hdfs-journalnodes");
        appendHbaseMaster(message.hmasters, "hbase-masters");
        appendNodeService(message.regionservers, "hbase-regionservers");
        appendGangliaGmetad(message.gmetads, "ganglia-gmetads");
        appendNodeService(message.gmonds, "ganglia-gmonds");
        appendNodeService(message.drivers, "spark-drivers");
	};
	return s;
};

var mesosSocket = createMesosSocket();

var appendMesosMaster = function(data, id) {
    $.each(data, function(key, value) {
        $.getJSON( "http://" + value.publicIp + ":5050/master/state.json", function(data) {
            var leader = data.leader.split("@")[1].split(":")[0];
            if (value.privateIp == leader) {
                $("#" + id).append("<a target='_blank' class='label label-success' href='http://" + value.publicIp + ":5050'>" + value.name + "</a> ");
            } else {
                $("#" + id).append("<a target='_blank' class='label label-default' href='http://" + value.publicIp + ":5050'>" + value.name + "</a> ");
            }
        });
    });
};

var appendHdfsNamenode = function(data, id) {
    $.each(data, function(key, value) {
        $.getJSON( "http://" + value.publicIp + ":50070/jmx?qry=Hadoop:service=NameNode,name=NameNodeStatus", function(data) {
            var state = data.beans[0].State;
            if (state == "active") {
                $("#" + id).append("<a target='_blank' class='label label-success' href='http://" + value.publicIp + ":50070'>" + value.name + "</a> ");
            } else {
                $("#" + id).append("<a target='_blank' class='label label-default' href='http://" + value.publicIp + ":50070'>" + value.name + "</a> ");
            }
        });
    });
};

var appendHbaseMaster = function(data, id) {
    $.each(data, function(key, value) {
        $("#" + id).append("<a target='_blank' class='label label-success' href='http://" + value.publicIp + ":60010'>" + value.name + "</a> ");
    });
};

var appendGangliaGmetad = function(data, id) {
    $.each(data, function(key, value) {
        $("#" + id).append("<a target='_blank' class='label label-success' href='http://" + value.publicIp + "/ganglia'>" + value.name + "</a> ");
    });
};

var appendNodeService = function(data, id) {
    $.each(data, function(key, value) {
        $("#" + id).append("<span href='#' class='label label-default'>" + value.name + "</span> ");
    });
};


