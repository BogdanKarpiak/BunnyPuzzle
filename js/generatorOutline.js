
function drawImage(imageObj,sources,property) {

    var width = imageObj.width;
    var height = imageObj.height;
    var myCanvas = $('#myCanvas');
    myCanvas.attr('width',width );
    myCanvas.attr('height',height );
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var xo = 0;
    var yo = 0;

   var kineticImage = new Kinetic.Image({
       image: imageObj
   });


    var stage4 = new Kinetic.Stage({
    container: 'container4',
    width: width ,
    height: height
    })

    var layer4 = new Kinetic.Layer();

    layer4.add(kineticImage);
    $.each(coords,function(value,index){
        var poly = new Kinetic.Line({
            points: coords[value],
            stroke: 'rgb(0,0,0)',
            strokeWidth: 2,
            opacity:0.2,
            closed:true
        })
        layer4.add(poly);
    })

    stage4.add(layer4);
    layer4.toImage({

        callback: function(img) {

            canvas.width = canvas.width;
            context.drawImage(img, xo, yo );

            var imageData = context.getImageData(xo, yo,width,height);
            var data = imageData.data;

            // overwrite original image
            for(var y = 0; y < height; y++) {
                // loop through each column
                for(var x = 0; x < width; x++) {

                    if ((data[((width * y) + x) * 4 + 3] >= 0.5)  &&
                        (data[((width * y) + x) * 4] == 0) &&
                        (data[((width * y) + x) * 4 + 1] == 0) &&
                        data[((width * y) + x) * 4 + 2] == 0) {

                            data[((width * y) + x) * 4] = 255 ;
                            data[((width * y) + x) * 4 + 1] = 255 ;
                            data[((width * y) + x) * 4 + 2] = 255 ;
                            data[((width * y) + x) * 4 + 3] = 0;
                        }
                    }
                }
            context.putImageData(imageData, xo, yo);

            var dataURL2 = canvas.toDataURL();
            var whiteOutline2 = new Image();
            sources[''+property] = whiteOutline2.src = dataURL2;
        }
    });

  myCanvas.remove();
  $('#container4').remove();
}
