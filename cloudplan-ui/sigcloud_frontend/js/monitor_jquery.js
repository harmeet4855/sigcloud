
$(document).ready(function(){

    var counter = 0;

    $(".package_btn").click(function(e) {
        e.preventDefault();
        $("#packages").fadeIn();
        $("#custom").fadeOut();
        $("#catalog").fadeOut();
    });

    $(".custom_btn").click(function(e) {
        e.preventDefault();
        $("#custom").fadeIn();
        $("#packages").fadeOut();
        $("#catalog").fadeOut();

    });


    $(".catalog_btn").click(function(e) {
        e.preventDefault();
        $("#catalog").fadeIn();
        $("#custom").fadeOut();
        $("#packages").fadeOut();
    });

    //$(document).ready(function(){
    //   if($(location).attr('href')=="http://localhost:63342/sigcloud/ajax_1.html#cluster_2"){
    //        $("#cluster_1").hide();
    //       $("#cluster_2").show();
    //   }
    //    else{
    //       $("#cluster_2").hide();
    //       $("#cluster_1").show();
    //   }
    //});
    //
    //$(".cluster_title").click(function(e) {
    //    e.preventDefault();
    //    if($(this).attr("id")=="cluster_1"){
    //        $("#cluster_2").hide();
    //        $("#cluster_1").show();
    //    }
    //    else{
    //        $("#cluster_1").hide();
    //        $("#cluster_2").show();
    //    }
    //});

    //$("#cluster_1").click(function(e) {
    //    e.preventDefault();
    //    $("#cluster_1").fadeToggle();
    //
    //});
    //
    //$("#cluster_2").click(function(e) {
    //    e.preventDefault();
    //    $("#cluster_2").fadeToggle();
    //
    //});


});

