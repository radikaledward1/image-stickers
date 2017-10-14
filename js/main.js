$(document).ready(function() {

  $( init );

  function init() {

    // Draggable elements

    $('.opt-sticker').draggable( {
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
    } );

    // Droppable elements

    $('#canvas').droppable( {
      accept: '.opt-sticker, .opt-strap',
      drop: handleDropEvent
    } );

  }

  function handleDropEvent( event, ui ) {

    //implementar que no se pueden poner mas de un mismo elemento en el canvas. (Listo)
    //implementar que no se puedan poner mas de dos elementos en el canvas.

    var object = ui.draggable.clone();
    var object_class = '.' + object.attr('class').split(' ')[1];

    if ($(this).find(object_class).length == 0) {

      object.draggable({containment: '#canvas', snap: '#canvas'});
      $(this).append(object);

    }

  }

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

  function readURL(input) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {

        $('#preview').css('display', 'block');
        $('#preview').attr('src', e.target.result);

      }

      reader.readAsDataURL(input.files[0]);
    }

  }

});