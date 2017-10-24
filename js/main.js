
var image_info = [];

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
        helper = "<div class='helper-sticker'><img src='img/stickers/sticker-0.png'></div>";
      break;
      case "opt-sticker-blue":
        helper = "<div class='helper-sticker'><img src='img/stickers/sticker-0.png'></div>";
      break;
      case "opt-sticker-purple":
        helper = "<div class='helper-strap'><img src='img/banners/banner-0.png'></div>";
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
            extra_canvas.setAttribute('width', image_info[0]);
            extra_canvas.setAttribute('height', image_info[1]);
            var ctx = extra_canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image_info[0], image_info[1]);

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
  $('#canvas').find('.helper-sticker, .helper-strap').remove();

}

function readURL(input) {
  
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {

      var img = new Image;

      var src = $('#preview').attr('src');
      if ( src == '#') {

        $('#canvas').droppable( {
          accept: '.opt-sticker',
          drop: handleDropEvent
        } );

      }else{

        clear_canvas();

        //Restart image info
        image_info = [];
      }

      img.src = e.target.result;
      $('#preview').css('display', 'block');
      $('#preview').attr('src', e.target.result);

      img.onload = function() {

        image_info = [img.width, img.height];
      }

    }

    reader.readAsDataURL(input.files[0]);
  }

}

function handleDropEvent( event, ui ) {

  var object = ui.helper.clone();
  var object_class = object.attr('class').split(' ')[0];
  
  object.css({top: '50px', left: '50px', opacity: ''});
  object.draggable({containment: '#canvas'});

  var child = object.children();
  if (object_class == 'helper-sticker') {

    child.css({width: '50px', height: '50px'});

  }else{

    child.css({width: '100px', height: '50px'});

  }
    
  child.resizable({containment: '#canvas'});

  object.rotatable();

  $(this).append(object);
  $(this).find('.ui-icon, .ui-rotatable-handle').attr('data-html2canvas-ignore', 'true');

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

  /*
  var object = ui.helper.clone();
  var object_id = '#' + object.attr('id');
  var object_class = object.attr('class').split(' ')[0];

  if ($(this).find(object_id).length == 0) {

    elements_counter++;

    if (elements_counter == 2) {

      object.css({top: '150px', left: '50px', opacity: ''});
      $(this).droppable('disable');

    }else{

      object.css({top: '50px', left: '50px', opacity: ''});
    }

    object.draggable({containment: '#canvas'});

    var child = object.children();
    if (object_class == 'sticker') {

      child.css({width: '50px', height: '50px'});

    }else{

      child.css({width: '100px', height: '50px'});

    }
    
    child.resizable({containment: '#canvas'});

    $(this).append(object);

  }
  */

}