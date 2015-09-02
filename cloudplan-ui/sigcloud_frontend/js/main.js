  
$(document).ready(function(){
    $(".btn-cta").click(function(e) {
        e.preventDefault();
        $("#accordion-main").fadeIn();
        $(".description1").fadeIn();
        $("#menu-toggle").fadeIn();
        $(".onpremise").fadeOut();
        $(".marquee").fadeOut();
        $(".footer").fadeOut();
    });

    $(".upload_btn").click(function(e) {
        e.preventDefault();
        $("#accordion-main").fadeIn();
        $(".onpremise").fadeIn();
        $("#menu-toggle").fadeIn();
        $(".description1").fadeOut();
        $(".marquee").fadeOut();
        $(".footer").fadeOut();
    });

    $("#upload_mech").click(function(e) {
        e.preventDefault();
        $(".premise_mech").fadeIn();
        $(".premise_grid").fadeOut();
    });

    $("#upload_grid").click(function(e) {
        e.preventDefault();
        $(".premise_grid").fadeIn();
        $(".premise_mech").fadeOut();
    });


    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#jquery-accordion-menu").fadeToggle();
        if($(".description").hasClass("col-lg-9")){
            $(".description").removeClass("col-lg-9").addClass("col-lg-12");
            $("#menu-toggle").text("Show Steps");}
        else{
            $(".description").removeClass("col-lg-12").addClass("col-lg-9");
            $("#menu-toggle").text("Hide Steps");}    
        });

    var counter = 0;


    // IF FORM IS VALID AND COMPLETE THEN ONLY MAKE USER PROCEED AND COUNTER EXCEED

    $("#premise_mech_deploy").click(function(e) {
        e.preventDefault();
        $("#bar1").fadeIn();
        $("#bar2").fadeIn();
        $("#abort").fadeIn();
        $("#step1").removeClass("active");
        $("#step2").addClass("active");
        $(".onpremise").fadeOut();
        $(".description2").fadeIn();
        counter = 1;
    });

    $("#premise_grid_deploy").click(function(e) {
        e.preventDefault();
        $("#bar1").fadeIn();
        $("#bar2").fadeIn();
        $("#abort").fadeIn();
        $("#step1").removeClass("active");
        $("#step2").addClass("active");
        $(".onpremise").fadeOut();
        $(".description2").fadeIn();
        counter = 1;
    });


    $("#deploy,#premise_mech_deploy,#premise_grid_deploy").click(function(e) {
        e.preventDefault();
        $("#bar1").fadeIn();
        $("#bar2").fadeIn();
        $("#abort").fadeIn();
        $("#step1").removeClass("active");
        $("#step2").addClass("active");
        $(".description1").fadeOut();
        $(".description2").fadeIn();
        $(".disp_bar").animate({"width":"100%"},4000,"linear",function() {
                $(".machines_launched").fadeIn();

            });
        counter = 1;
    });

    //
    //window.setTimeout(function() {
    //    if ($(".disp_bar").attr("style") == "width: 100%;") {
    //        console.log("aaaaaa");
    //        $(".machines_launched").fadeIn();
    //        //$(".final").click(function(e) {
    //        //    e.preventDefault();
    //        //
    //        //})
    //    }
    //}, 3000);



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


    $("#step1_1").click(function(e) {
        e.preventDefault();
        if(counter){
            $("#step2").removeClass("active");
            $("#step1").addClass("active");
            $(".description2").fadeOut();
            $(".description1_updated").fadeIn();
        }
    });

    $("#step2_2").click(function(e) {
        e.preventDefault();
        if(counter){
            $("#step1").removeClass("active");
            $("#step2").addClass("active");
            $(".description1_updated").fadeOut();
            $(".description2").fadeIn();
        }
    });



    //$(".test").click(function(e) {
    //    var itemname = $(this).parent().parent()[0].innerText;
    //    if($(this).is(":checked")){
    //        // console.log(itemname);
    //        var content = $("<p" + " class=" + "'" + itemname + "'" + ">" + itemname + "</p>");
    //        $("#service_cart").append(content);
    //    }
    //    else{
    //        $("." + itemname).remove();
    //    }
    //
    //});

    $(".carters").click(function(e) {
        e.preventDefault();
        if($(this).parent().parent().hasClass("cartwrap")){
            $(this).parent().prependTo("#service_cart");
        }
        else{
            $(this).parent().appendTo(".cartwrap");
        }
    });

    var premiseclicker=1;
    $(".premiseround").click(function(e) {
        e.preventDefault();
        premiseclicker++;
        console.log(premiseclicker);
        var grid = $('<div>').append($('.premisegrid').clone()).html();

        $(".premisegridwrap").append(grid);
        $(".premisegrid").last().removeClass("premisegrid").addClass("premisegrid2");
        $(".premisegrid2").last().find(".premisegridhead").text("Grid " + premiseclicker + "  ");
        $(".premisegrid2").find(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus");
        $(".premisegrid2").last().find(".premiseround").addClass("premiseclosed").attr("data-set",premiseclicker);

        $(".premiseclosed").click(function(e) {
            var check = $(this).data("set");
            console.log(premiseclicker);
            e.preventDefault();
            $(this).closest(".premisegrid2").fadeOut();

        });

    });


    var clicker=1;
    $(".round").click(function(e) {
        e.preventDefault();
        clicker++;
        //var grid = $(".grid");
        console.log(clicker);
        var grid = $('<div>').append($('.grid').clone()).html();

        $(".gridwrap").append(grid);
        $(".grid").last().removeClass("grid").addClass("grid2");
        $(".grid2").last().find(".gridhead").text("Grid " + clicker + "  ");
        $(".grid2").find(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus");
        $(".grid2").last().find(".round").addClass("closed").attr("data-set",clicker);



        $(".closed").click(function(e) {
            var check = $(this).data("set");
            console.log(clicker);
            e.preventDefault();
            //$(this).closest(".grid2")
            $(this).closest(".grid2").fadeOut();

        });

    });


});

    