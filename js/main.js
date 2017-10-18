var elements_counter = 0;

$('.opt-sticker').draggable( {
  //containment: '#canvas',
  cursor: 'move',
  //snap: '#canvas',
  revert: "invalid",
  //helper: 'clone',
  helper: function(event) {
    var object_id = $(this).attr('id');
    var helper = '';

    switch (object_id) {

      case "opt-sticker-red":
        helper = "<div class='sticker' id='helper-sticker-red'><img src='img/stickers/sticker-0.png'></div>";
      break;
    }

    return $(helper);
  },
  opacity: 0.35
} );

$('.opt-strap').draggable( {
  //containment: '#canvas',
  cursor: 'move',
  //snap: '#canvas',
  revert: "invalid",
  helper: function(event) {
    var object_id = $(this).attr('id');
    var helper = '';

    switch (object_id) {

      case "opt-strap-blue":
        helper = "<div class='strap' id='helper-strap-blue'><img src='img/banners/banner-0.png'></div>";
      break;
    }

    return $(helper);
  },
  opacity: 0.35
} );

/*$('.opt-sticker').draggable( {
  //containment: '#canvas',
  cursor: 'move',
  //snap: '#canvas',
  revert: "invalid",
  helper: 'clone',
  opacity: 0.35
} );

$('.opt-strap').draggable( {
  //containment: '#canvas',
  cursor: 'move',
  //snap: '#canvas',
  revert: "invalid",
  helper: 'clone',
  opacity: 0.35
} );*/

$("#procesar").click(function(){

    var element = $("#canvas");
    //var getCanvas;

    /*html2canvas(element, {
     onrendered: function (image) {

            getCanvas = image;

            var imgageData = getCanvas.toDataURL("image/png");
    
            var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
            $("#descargar").attr("download", "pruebas-descarga.png").attr("href", newData);

         }
     });*/

    html2canvas(element, {
         onrendered: function (image) {

            //get the rendered canvas, and create, another one with the new size
            var extra_canvas = document.createElement("canvas");
            extra_canvas.setAttribute('width',736);
            extra_canvas.setAttribute('height',796);
            var ctx = extra_canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 736, 796);

            /*var imgageData = extra_canvas.toDataURL("image/png");

            var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
            $("#descargar").attr("download", "pruebas-descarga.png").attr("href", newData);*/

            //use FileSaver to download the image canvas correctly
            extra_canvas.toBlob(function(blob) {

                saveAs(blob, "image-sticker.png");
            });
        }
    });

});


$('#limpiar').click(function() {

  clear_canvas();

});

function clear_canvas() {

  //Remove all elements in the canvas
  $('#canvas').find('.sticker, .strap').remove();

  //Restart the elements_counter
  elements_counter = 0;

  //The canvas is droppable again
  $('#canvas').droppable('enable');

}

function readURL(input) {
  
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {

      var src = $('#preview').attr('src');
      if ( src == '#') {

        $('#canvas').droppable( {
          accept: '.opt-sticker, .opt-strap',
          drop: handleDropEvent
        } );

      }else{

        clear_canvas();
      }

      $('#preview').css('display', 'block');
      $('#preview').attr('src', e.target.result);

    }

    reader.readAsDataURL(input.files[0]);
  }

}

function handleDropEvent( event, ui ) {

  /*var object = ui.draggable.clone();
  var object_class = '.' + object.attr('class').split(' ')[1];

  if ($(this).find(object_class).length == 0) {

    object.draggable({containment: '#canvas', snap: '#canvas'});
    $(this).append(object);

    elements_counter++;

    if (elements_counter == 2) {
      $(this).droppable('disable');
    }

  }*/

  var object = ui.helper.clone();
  var object_id = '#' + object.attr('id');

  if ($(this).find(object_id).length == 0) {

    elements_counter++;

    if (elements_counter == 2) {

      object.css({top: '150px', left: '50px', opacity: ''});
      $(this).droppable('disable');

    }else{

      object.css({top: '50px', left: '50px', opacity: ''});
    }

    object.draggable({containment: '#canvas'});

    /*var child = object.children();
    child.resizable({containment: '#canvas'});*/

    $(this).append(object);

  }

}