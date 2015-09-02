
var x;
var y;
var cluster = {};
var node1={},node2={},node3={};
var http_service,ping_service,ssh_service;



//        function getServerData(){
//            $.ajax({
//                url: "http://54.237.98.205:8090/state"
//            }).done(function(data) {
//               console.log(data)
//            });
//        }
//
//

function loadXMLDoc()
{
    var xmlhttp;
    var txt,i;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            x=xmlhttp.responseText;




            y = JSON.parse(x);
            node1.http_service= y.content.localhost.services["HTTP"];
            node1.ssh_service= y.content.localhost.services["SSH"];
            node1.ping_service= y.content.localhost.services["PING"];



        }
    };
    xmlhttp.open("GET","http://54.237.98.205:8090/state?t=" + Math.random(),true);
    xmlhttp.send();
}
$(document).ready(function() {
    loadXMLDoc();
    setInterval(loadXMLDoc, 3000);
});


function yo(){
    $("#monitor").append("<br>"+1);
}
