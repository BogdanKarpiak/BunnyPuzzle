
$( document ).ready(
    function() {



    function voronoiCoordinates(sites){

        var objectOfCoords = {};
        var canvas = document.getElementById("voronoiCanvas");
        $(canvas).attr('width',""+imageWidth).attr('height',""+imageHeight);
        canvas.width = canvas.width;
        var voronoi = new Voronoi();
        var bbox = {xl:0,xr:imageWidth,yt:0,yb:imageHeight};
        var diagram = voronoi.compute(sites, bbox);

        //diagram.vertices

        function render() {
            var ctx = canvas.getContext('2d');
            // background
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.rect(0,0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = '#888';
            ctx.stroke();
            // voronoi
            if (!diagram) {return;}
            // edges
            ctx.beginPath();
            ctx.strokeStyle = '#000';
            var edges = diagram.edges,
                iEdge = edges.length,
                edge, v;
            while (iEdge--) {
                edge = edges[iEdge];
                v = edge.va;
                ctx.moveTo(v.x,v.y);
                v = edge.vb;
                ctx.lineTo(v.x,v.y);
            }
            ctx.stroke();
            // edges
            ctx.beginPath();
            ctx.fillStyle = 'red';
            var vertices = diagram.vertices,
                iVertex = vertices.length;
            while (iVertex--) {
                v = vertices[iVertex];
                ctx.rect(v.x-1,v.y-1,3,3);
            }
            ctx.fill();
            // sites
            ctx.beginPath();
            ctx.fillStyle = '#44f';
            var iSite = sites.length;
            while (iSite--) {
                v = sites[iSite];
                ctx.rect(v.x-2/3,v.y-2/3,5,5);
            }
            ctx.fill();
            ctx.globalAlpha = 0.5;
            ctx.drawImage(dolphin,0,0);
        };

        function getObjectOfCellsCoords(){

            $.each(diagram.cells,function(index,elem){
                var cell = $(elem)['0'].halfedges
                var i,
                    lenght = cell.length;
                var Array = [];

                function pushCoordinates(Array,x1,y1){
                    Array.push(x1);
                    Array.push(y1);
                }

                for(i = 0;i<lenght-1;i++){

                    var x1 = Math.floor(cell[''+i]['edge']['va']['x']);
                    var y1 = Math.floor(cell[''+i]['edge']['va']['y']);
                    var x2 = Math.floor(cell[''+i]['edge']['vb']['x']);
                    var y2 = Math.floor(cell[''+i]['edge']['vb']['y']);

                    var x3 = Math.floor(cell[''+(i+1)]['edge']['va']['x']);
                    var y3 = Math.floor(cell[''+(i+1)]['edge']['va']['y']);
                    var x4 = Math.floor(cell[''+(i+1)]['edge']['vb']['x']);
                    var y4 = Math.floor(cell[''+(i+1)]['edge']['vb']['y']);

                    if (x1==x3 && y1==y3){
                        pushCoordinates(Array,x2,y2)
                    } else {
                        if(x1==x4 && y1==y4){
                            pushCoordinates(Array,x2,y2);
                        } else{
                            if (x2==x3 && y2==y3){
                                pushCoordinates(Array,x1,y1)

                            } else{
                                pushCoordinates(Array,x1,y1)

                            }
                        }
                    }
                }

                var x1 = Math.floor(cell['0']['edge']['va']['x']);
                var y1 = Math.floor(cell['0']['edge']['va']['y']);
                var x2 = Math.floor(cell['0']['edge']['vb']['x']);
                var y2 = Math.floor(cell['0']['edge']['vb']['y']);

                var x3 = Math.floor(cell[''+i]['edge']['va']['x']);
                var y3 = Math.floor(cell[''+i]['edge']['va']['y']);
                var x4 = Math.floor(cell[''+i]['edge']['vb']['x']);
                var y4 = Math.floor(cell[''+i]['edge']['vb']['y']);

                if (x1==x3 && y1==y3){
                    pushCoordinates(Array,x4,y4)
                } else {
                    if(x1==x4 && y1==y4){
                        pushCoordinates(Array,x3,y3)
                    } else{
                        if (x2==x3 && y2==y3){
                            pushCoordinates(Array,x4,y4)
                        } else{
                            pushCoordinates(Array,x3,y3)
                        }
                    }
                }
                objectOfCoords['part'+(index+1)] = Array;
            })
            return objectOfCoords;
        }
        render();

        var variable = getObjectOfCellsCoords();
        return variable

    };

    function getSitesArr(imageObj) {
        window.sites = [];
        var flag = 0;
        //var randomPoints = [];
        var horizontalPieces = 10;
        var verticalPieces = 10;
        var imageWidth = imageObj.width;
        var imageHeight = imageObj.height;
        var pieceWidth = imageWidth/horizontalPieces;
        var pieceHeight = imageHeight/verticalPieces;
        // radius of circle which sets constraints to the area where sites will be created
        var randomRadius = 45;
        var nonTransparentRadius = 10;
        var pointsNumber = 20;
        var stage = new Kinetic.Stage({
            container: "container",
            width: imageWidth,
            height: imageHeight
        });
        var image = new Kinetic.Image({
            x: 0,
            y: 0,
            image: imageObj,
            width: imageWidth,
            height: imageHeight
        });

        var mainLayer = new Kinetic.Layer();

        mainLayer.add(image);
        stage.add(mainLayer);
        var imageContext = image.getContext();

        //iterate over all possible sites
        for(var i=0;i<horizontalPieces + 1;i++){
            for(var j=0;j<verticalPieces + 1;j++){
                flag = 0;
                if(i == 0) {

                }
                var x = i*pieceWidth;
                var y = j*pieceHeight;
                var randomOffsetX = randomRadius * Math.random();
                var randomOffsetY = randomRadius * Math.random();
                var finalX = Math.floor(x + randomOffsetX);
                var finalY = Math.floor(y + randomOffsetY);
                for(var k = 0; k < pointsNumber; k++) {
                    var randomX = finalX + Math.floor((-1 + Math.random()*2)*nonTransparentRadius);
                    var randomY = finalY + Math.floor((-1 + Math.random()*2)*nonTransparentRadius);

                    var data = imageContext.getImageData(randomX, randomY, 1, 1).data;
                    var alpha = data[3];
                    if(alpha == 0) {
                        flag = 1;
                        break;
                    }
                }
                if(flag == 0) {
                    sites.push({
                        x: finalX,
                        y: finalY
                    });
                }
            }
        }

        var lines = [];

        function recursiveCall(points){

        }


        for(var m = 0; m < sites.length; m++) {
            /*lines[m] = new Kinetic.Line({
                points: [sites[m].x, sites[m].y, sites[m].x + 0.01, sites[m].y + 0.01],
                stroke: 'red',
                strokeWidth: 4,
                lineCap: 'round',
                lineJoin: 'round',
                draggable: true
            });*/

            lines[m] = new Kinetic.Circle({
                x: sites[m].x,
                y: sites[m].y,
                radius: 6,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 2,
                draggable: true
            });

            // add the shape to the layer
            lines[m].on('dragmove', (function (z){
                return function() {
                    var mousePos = stage.getPointerPosition();
                    var endPointX = mousePos.x;
                    var endPointY = mousePos.y;
                    sites[z].x = endPointX;
                    sites[z].y = endPointY;
                    voronoiCoordinates(sites)
                }
            })(m));
            mainLayer.add(lines[m]);
        }

        stage.add(mainLayer);
        //$('#container').remove();
        return sites;
    };
        console.time('test');
    function DrawPuzzle(stg,layer,polygons){

        function loadImages(sources, callback) {
            var assetDir = '';
            var images = {};
            var loadedImages = 0;
            var numImages = 0;
            for(var src in sources) {
                numImages++;
            }
            for(var src in sources) {
                images[src] = new Image();
                images[src].onload = function() {
                    if(++loadedImages >= numImages) {
                        callback(images);
                    }
                };
                images[src].src = assetDir + sources[src];
            }
        }

        function isNearOutline(animal, outline) {
            var a = animal;
            var o = outline;
            var ax = a.getX();
            var ay = a.getY();

            if(ax > o.x - 450 && ax < o.x + 450 && ay > o.y - 450 && ay < o.y + 450) {
                return true;
            }
            else {
                return false;
            }
        }

        function drawBackground(background, backgroundImg, text) {
            var context = background.getContext();

            context.drawImage(backgroundImg, 0, 0);
            context.setAttr('font', '50pt Calibri');
            context.setAttr('textAlign', 'center');
            context.setAttr('fillStyle', 'white');
            context.fillText(text, background.getStage().getWidth() / 2, 100);
        }

        function hidePolygons(obj){
            for (key in obj){
                obj[key].hide();
            }
        }

        function initStage(images) {

            var stage = stg
            var background = new Kinetic.Layer();
            var animalLayer = new Kinetic.Layer();
            var layerOfPolygons = layer;

            hidePolygons(polygons);
            //var animalShapes = [];
            var score = 0;

            // image positions
            var A = getRandomPositionOfImages(Coords);
            var outlines = A.out1;
            var animals = A.out2;

            function getRandomPositionOfImages(coordsObject){

                var borderRight = stage.width()/2
                var borderBottom = stage.height()/2;



                xCoord = borderRight/2 + imageWidth/2;
                yCoord = borderBottom - imageHeight/2;

                var outlines = {
                    white_coords: {
                        x:xCoord,
                        y:yCoord
                    }
                };
                var animals = {

                };

                for (key in coordsObject) {
                    outlines[key +'_coords'] = {};
                    outlines[key+'_coords'].x = xCoord;
                    outlines[key+'_coords'].y = yCoord ;

                    animals[key] = {};

                    animals[key].x = xCoord - borderRight/1.2 + Math.random()*10;
                    animals[key].y = yCoord + Math.random()*10;

                }
                //console.log(outlines);
                return {
                    out1:outlines,
                    out2:animals
                };
            }

// create draggable animals
            for(var key in animals) {
                // anonymous function to induce scope
                (function() {
                    var privKey = key;
                    var anim = animals[key];

                    var animal = new Kinetic.Image({
                        image: images[key],
                        x: anim.x,
                        y: anim.y,
                        draggable: true,
                        brightness: 0,
                        blurRadius: 0
                    });

                    //window.obj = animal[];

                    animal.cache();
                    animal.drawHitFromCache();
                    animal.filters([
                        Kinetic.Filters.Blur,
                        Kinetic.Filters.Brighten
                    ]);

                    animal.on('dragstart', function() {
                        layerOfPolygons.moveToTop();
                        layerOfPolygons.draw();
                        this.moveToTop();
                        animalLayer.draw();
                    });
                    /*
                     * check if animal is in the right spot and
                     * snap into place if it is
                     */
                    animal.on('dragend', function() {

                        var outline = outlines[privKey + '_coords'];
                        if(!animal.inRightPlace && isNearOutline(animal, outline)) {
                            console.log(privKey);
                            polygons[privKey].offsetX(-xCoord);
                            polygons[privKey].offsetY(-yCoord);
                            polygons[privKey].show();
                            layerOfPolygons.draw();
                            //animal.destroy();
                            animal.setPosition({x:outline.x, y:outline.y});
                            animalLayer.draw();
                            animal.inRightPlace = true;
                            if(++score >= Object.keys(images).length - 2) {
                                var text = 'You win! Enjoy your booty!'
                                drawBackground(background, images.background, text);
                            }

                            // disable drag and drop
                            setTimeout(function() {
                                animal.setDraggable(false);
                                polygons[privKey].setDraggable(false);
                            }, 50);
                        }
                    });
// make animal glow on mouseover
                    animal.on('mouseover touchstart', function() {
                        animal.blurRadius(1);
                        animal.brightness(0.3);
                        animalLayer.draw();
                        document.body.style.cursor = 'pointer';
                    });
// return animal on mouseout
                    animal.on('mouseout touchend', function() {
                        animal.blurRadius(0);
                        animal.brightness(0);
                        animalLayer.draw();
                        document.body.style.cursor = 'default';
                    });

                    animal.on('dragmove', function() {
                        document.body.style.cursor = 'pointer';
                    });

                    animalLayer.add(animal);

                })();
            }

// create animal outlines

            // anonymous function to induce scope
            var imageObj = images['white_coords'];
            var out = outlines['white_coords'];

            var outline = new Kinetic.Image({
                image: imageObj,
                x: out.x,
                y: out.y
            });

            animalLayer.add(outline);

            stage.add(background);
            stage.add(animalLayer);

            drawBackground(background, images.background, 'Ahoy! Put the animals on the background!');
        }

        loadImages(sources, initStage)
        console.timeEnd('test');
    };


    function getSourses(Coords){
    var Images = {};
    var stage = new Kinetic.Stage({
        container: 'container2',
        width: screen.width,
        height: screen.height
    });
    var layer = new Kinetic.Layer({
        id:'polygonLayer'
    });

        $('#polygonLayer')
    CreatePolygon.counter = 1;
    $.each(Coords,function(index,value){
        CreatePolygon(value,index);
    });

    function CreatePolygon(ArrayofCoords,index){

        return function(x){
            var poly = new Kinetic.Line({
                points: ArrayofCoords,
                fillPatternImage:dolphin,
                fillPatternOffset:{x:0,y:0},
                closed:true,
                draggable:true
            })

            layer.add(poly);
            paintPolygonBoundaries(poly);
            layer.add(poly);
            objectOfPolygons['part'+x] = poly;
            poly.toImage({
                width: imageWidth,
                height: imageHeight,
                quality:1,
                callback: function(img) {
                    //$('body').append($(img));

                    Images['part'+x] = img.src;
                    $.extend(sources,Images);
                    layer.draw();
                    if(Object.keys(sources).length == (2 + Object.keys(Coords).length)){
                        DrawPuzzle(stage,layer,objectOfPolygons);
                    }
                }
            });
            //layer.remove(poly);
        }(CreatePolygon.counter++)
    }
        stage.add(layer);
        //$("#container2").remove();
    }

   function paintPolygonBoundaries(imgK) {
       var imgWidth = imgK.getWidth();
       var imgHeight = imgK.getHeight();
       var ctx = imgK.getContext();
       var imageData = ctx.getImageData(0, 0, imageHeight, imageWidth);
       var data = imageData.data;

       for(var i = 0, len = data.length; i < len; i += 4) {
           if(data[i + 3] != 0) {
               data[i + 3] = 255;
           }
       }
       ctx.putImageData(imageData, 0, 0);
    }

    var objectOfPolygons = {};
    var counter = 0;
    var imageWidth;
    var imageHeight;
    var Coords;
    var xCoord ;
    var yCoord ;
    var dolphin = new Image();
    dolphin.src = '../images/10.png';

    dolphin.onload = function(){

        imageHeight = dolphin.height;
        imageWidth = dolphin.width;
        getSitesArr(dolphin);
        voronoiCoordinates(sites)
        //----------------------------------------
        $('#approve').on('click',function(event){
            console.log(sites);
            window.coords = Coords = voronoiCoordinates(sites);
            $("#container").remove();
            $('#voronoiCanvas').remove();
            drawImage(dolphin);
            getSourses(Coords);
        })
        //----------------------------------------
    };
})



