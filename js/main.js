
/*	
function allowDrop(e)
{
    e.preventDefault();
}

function drag(e)
{
    //store the position of the mouse relativly to the image position
    e.dataTransfer.setData("mouse_position_x",e.clientX - e.target.offsetLeft );
    e.dataTransfer.setData("mouse_position_y",e.clientY - e.target.offsetTop  );

    e.dataTransfer.setData("image_id",e.target.id);
}

function drop(e)
{
    e.preventDefault();
    var image = document.getElementById( e.dataTransfer.getData("image_id") );

    var mouse_position_x = e.dataTransfer.getData("mouse_position_x");
    var mouse_position_y = e.dataTransfer.getData("mouse_position_y");

    var canvas = document.getElementById('canvas');

    var ctx = canvas.getContext('2d');

	var imageObj = new Image();

    imageObj.onload=function(){
        ctx.save();
    	ctx.drawImage(this,0,0,canvas.width,canvas.height);
        ctx.restore();
    }

    imageObj.src="people-face5.jpg";

    // the image is drawn on the canvas at the position of the mouse when we lifted the mouse button
    ctx.drawImage( image , e.clientX - canvas.offsetLeft - mouse_position_x , e.clientY - canvas.offsetTop - mouse_position_y );
}
*/

$( init );

function init() {

  $('#redsquare').draggable( {
    containment: '.canvas',
    cursor: 'move',
    snap: '.canvas'
  } );

  $('#greensquare').draggable( {
    containment: '.canvas',
    cursor: 'move',
    snap: '.canvas'
  } );

}

$("#procesar").click(function(){

    var element = $(".canvas");
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

            //use FileSaver to download the image canvaz correctly
            extra_canvas.toBlob(function(blob) {

                saveAs(blob, "image-sticker.png");
            });
        }
    });

});