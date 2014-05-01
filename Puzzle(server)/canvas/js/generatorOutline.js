var sources = {
    background: 'sand_2048x1536.jpg'
};

function drawImage(imageObj) {

    var width = imageObj.width;
    var height = imageObj.height;

    $('#myCanvas').attr('width',width );
    $('#myCanvas').attr('height',height );
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var xo = 0;
    var yo = 0;
    context.webkitImageSmoothingEnabled=true
    context.drawImage(imageObj, xo, yo,width,height);
    context.stroke();

    var imageData = context.getImageData(xo, yo, width,height);

    var data = imageData.data;

    function changePixelColortoBlack(x,y){
        data[((width * y) + x) * 4] = 1 ;
        data[((width * y) + x) * 4 + 1] = 0 ;
        data[((width * y) + x) * 4 + 2] = 0 ;
        data[((width * y) + x) * 4 + 3] = 255;
    }

    // overwrite original image
    for(var y = 0; y < height; y++) {
        // loop through each column
        for(var x = 0; x < width; x++) {

            if (data[((width * y) + x) * 4 + 3] !=0){

                data[((width * y) + x) * 4] = 255 ;
                data[((width * y) + x) * 4 + 1] = 255 ;
                data[((width * y) + x) * 4 + 2] = 250 ;
                data[((width * y) + x) * 4 + 3] = 255;

                if (data[((width * y) + x-1) * 4 + 3] == 0){
                    //changePixelColortoBlack(x-2,y-2)
                    changePixelColortoBlack(x,y)
                    changePixelColortoBlack(x-1,y-1)
                }

                if (data[((width * (y-1)) + x-1) * 4 + 3] == 0){
                    //changePixelColortoBlack(x-2,y-2)
                    changePixelColortoBlack(x,y)
                    changePixelColortoBlack(x-1,y-1)
                }

                if (data[((width * (y-1)) + x) * 4 + 3] == 0){
                    //changePixelColortoBlack(x-1,y-2)
                    changePixelColortoBlack(x-1,y-1)
                }
            }
        }

    }
    context.putImageData(imageData, xo, yo);

    for(var y = height; y > 0; y--) {
        // loop through each column
        for(var x = width ; x > 0; x--) {

            if (data[((width * y) + x) * 4 + 3] != 0){

                if (data[((width * y) + x+1) * 4 + 3] == 0){
                    changePixelColortoBlack(x-1,y)
                    changePixelColortoBlack(x,y)
                    //changePixelColortoBlack(x+1,y+1)
                }

                if (data[((width * (y+1)) + x+1) * 4 + 3] == 0){
                    changePixelColortoBlack(x-1,y-1)
                    changePixelColortoBlack(x,y);
                    //changePixelColortoBlack(x+1,y+1)

                }

               /* if (data[((width * (y+1)) + x) * 4 + 3] == 0){
                    changePixelColortoBlack(x,y-1)
                    changePixelColortoBlack(x,y)
                    changePixelColortoBlack(x+1,y+1)
                }*/

            }
        }

    }

    context.putImageData(imageData, xo, yo);

    for(var y = 0; y < height; y++) {
        // loop through each column
        for(var x = 0; x < width; x++) {

            if (data[((width * y) + x) * 4 + 3] != 0){

                if (data[((width * (y-1)) + x) * 4 + 3] == 0){

                 changePixelColortoBlack(x,y);
                 changePixelColortoBlack(x,y-1);

                 }
            }
        }

    }
    context.putImageData(imageData, xo, yo);

    for(var y = height; y > 0; y--) {
        // loop through each column
        for(var x = width ; x > 0; x--) {

            if (data[((width * y) + x) * 4 + 3] != 0){

                if (data[((width * (y+1)) + x) * 4 + 3] == 0){
                    //changePixelColortoBlack(x-1,y)
                    changePixelColortoBlack(x,y);
                    changePixelColortoBlack(x,y+1);
                }

            }
        }

    }

    context.putImageData(imageData, xo, yo);


    function returnData(){
        context.webkitImageSmoothingEnabled=true
        var dataURL = canvas.toDataURL();
        var whiteOutline = new Image();
        whiteOutline.src = dataURL;
        canvas.width = canvas.width;
        return whiteOutline
    }

    var finalImage = returnData();

    function setShadow(x,y,amplitude){

        //context.shadowBlur = 20;
        context.webkitImageSmoothingEnabled=true
        context.shadowColor = "rgba( 10, 10, 10, 1 )";
        context.shadowOffsetX = x*amplitude;
        context.shadowOffsetY = y*amplitude;
        context.drawImage( finalImage, 0, 0 );
        context.webkitImageSmoothingEnabled=true
    }

    for (var i = 0;i<6;i=i+Math.PI/18){

        setShadow(Math.cos(i),Math.sin(i),2);
    }

    var dataURL3 = canvas.toDataURL();
    var whiteOutline3 = new Image();
    whiteOutline3.src = dataURL3;

   var kineticImage = new Kinetic.Image({
       image: whiteOutline3,
       brightness: 0,
       blurRadius: 1
   });

    kineticImage.cache();
    kineticImage.drawHitFromCache();
    kineticImage.filters([
        Kinetic.Filters.Blur,
        Kinetic.Filters.Brighten
    ]);

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
            opacity:0.1,
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

                    if (/*(data[((width * y) + x) * 4 + 3] >= 0.5)  &&*/
                        (data[((width * y) + x) * 4] == 0) &&
                        (data[((width * y) + x) * 4 + 1] == 0) &&
                        data[((width * y) + x) * 4 + 2] == 0) {

                            /*data[((width * y) + x) * 4] = 255 ;
                            data[((width * y) + x) * 4 + 1] = 255 ;
                            data[((width * y) + x) * 4 + 2] = 255 ;*/
                            data[((width * y) + x) * 4 + 3] = 0;
                        }
                    }
                }
            context.putImageData(imageData, xo, yo);

            var dataURL2 = canvas.toDataURL();
            var whiteOutline2 = new Image();
            sources.white_coords = whiteOutline2.src = dataURL2;

        }
    });

  $('#myCanvas').remove();
  $('#container4').remove();
   return finalImage;
}
