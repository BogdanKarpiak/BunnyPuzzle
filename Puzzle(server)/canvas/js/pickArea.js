var testImage = new Image();
testImage.src = '../images/11.png'
testImage.onload = function(){

    var stageTest = new Kinetic.Stage({
        container: 'test',
        width: testImage.width+10,
        height: testImage.height+10
    })

    var layerTest = new Kinetic.Layer();

    var testKineticImage = new Kinetic.Image({
        width:testImage.width,
        heigh:testImage.height,
        image:testImage
    });

    layerTest.add(testKineticImage);
    stageTest.add(layerTest);

    $('#create').on('click',function(){

        var CurrentCoordX,
            CurrentCoordY,
            startPointX,
            startPointY,
            polyCoordsArray = [],
            object

        var objectLine = new Kinetic.Line({
            stroke: 'black',
            strokeWidth: 5,
            lineCap: 'round',
            lineJoin: 'round',
            dash: [33, 10]
        });

        var poly = new Kinetic.Line({
            fill: '#00D2FF',
            stroke: 'black',
            opacity:0.5,
            strokeWidth: 5,
            closed: true
        });

        layerTest.add(poly);

        testKineticImage.on('mousedown',function(e){

             var mousePos = stageTest.getPointerPosition();
             startPointX = mousePos.x;
             startPointY = mousePos.y;
             polyCoordsArray.push(startPointX);
             polyCoordsArray.push(startPointY);
             poly.points(polyCoordsArray);
            layerTest.draw();

            console.log('mousedown')

            testKineticImage.on('mousemove',function(e){
                console.log('move')
                var mousePos = stageTest.getPointerPosition();
                CurrentCoordX = mousePos.x;
                CurrentCoordY = mousePos.y;
                layerTest.add(objectLine);
                objectLine.points([startPointX,startPointY,CurrentCoordX,CurrentCoordY]);
                layerTest.draw();
            });

        })

        $(document).on('mouseup',function(){

            console.log('up')
            console.log('deletemove')
            console.log('deleteup')
            testKineticImage.off('mousemove');
            testKineticImage.fire('mousedown');

        })

        function createPolygon(){

            var whitePoly = new Kinetic.Line({
                fill:'grey',
                stroke: 'white',
                points:polyCoordsArray,
                opacity:1,
                strokeWidth: 5,
                closed: true
            });
            layerTest.add(whitePoly);

            polyCoordsArray.length = 0;
            objectLine.points([]);
            layerTest.draw();
        }

        $('#savePart').on('click',function(){
            createPolygon();
        })

    })

}

