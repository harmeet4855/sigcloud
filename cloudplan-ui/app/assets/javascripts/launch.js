// Populating Images
$.getJSON( "/list/images", function( data ) {
  var items = [];
  $.each( data, function( key, value ) {
    $("#selectImage").append($('<option>', {
        value: value.name,
        text: value.description
    }));
  });
});

// Populating Regions
$.getJSON( "/list/regions", function( data ) {
  var items = [];
  $.each( data, function( key, value ) {
    $("#selectRegion").append($('<option>', {
        value: value.name,
        text: value.name
    }));
  });
});

$("#selectRegion").on('change', function() {
    // Popluating Machines
    $.getJSON( "/list/hardwares"/*/"/* + this.value*/, function( data ) {
      var items = [];
      $.each( data, function( key, value ) {
        $("#selectMachine").append($('<option>', {
            value: value.name,
            text: value.name + ' ( ' + value.cores + ' core, ' + value.ram + ' gb )'
        }));
      });
    });
});