
$( document ).ready(function() {

    function voronoiCoordinates(sites){

        var objectOfCoords = {};
        //var canvas = document.getElementById("voronoiCanvas");
        var voronoi = new Voronoi();
        var bbox = {xl:0,xr:imageWidth,yt:0,yb:imageHeight};
        var diagram = voronoi.compute(sites, bbox);

        //diagram.vertices

        /* function render() {
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
         ctx.rect(v.x-2/3,v.y-2/3,2,2);
         }
         ctx.fill();
         };*/

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
        //render();

        var variable = getObjectOfCellsCoords();
        $('#voronoiCanvas').remove();
        return variable

    };

    function getSitesArr(imageObj) {
        var sites = [];
        var flag = 0;
        //var randomPoints = [];
        var horizontalPieces = 8;
        var verticalPieces = 8;
        var imageWidth = imageObj.width;
        var imageHeight = imageObj.height;
        var pieceWidth = imageWidth/horizontalPieces;
        var pieceHeight = imageHeight/verticalPieces;
        // radius of circle which sets constraints to the area where sites will be created
        var randomRadius = 40;
        var nonTransparentRadius = 5;
        var pointsNumber = 20;
        var data,
            w = dolphin.width,
            h = dolphin.height;
        var canvas = document.getElementById('sitesLayer');
        $(canvas).attr("width", w);
        $(canvas).attr("height", h);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(imageObj, 0, 0);

        //iterate over all possible sites
        for(var i=0;i<horizontalPieces + 1;i++){
            for(var j=0;j<verticalPieces + 1;j++){
                flag = 0;
                var x = i*pieceWidth;
                var y = j*pieceHeight;
                var randomOffsetX = randomRadius * Math.random();
                var randomOffsetY = randomRadius * Math.random();
                var finalX = Math.floor(x + randomOffsetX);
                var finalY = Math.floor(y + randomOffsetY);
                for(var k = 0; k < pointsNumber; k++) {
                    var randomX = finalX + Math.floor((-1 + Math.random()*2)*nonTransparentRadius);
                    var randomY = finalY + Math.floor((-1 + Math.random()*2)*nonTransparentRadius);

                    data = ctx.getImageData(randomX, randomY, 1, 1).data;
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
                /*data = ctx.getImageData(finalX, finalY, 1, 1).data;
                if(data[3] != 0) {
                    sites.push({
                        x: finalX,
                        y: finalY
                    });
                }*/
            }
        }

        /*for(var m in sites) {
            ctx.beginPath();
            ctx.moveTo(sites[m].x, sites[m].y);
            ctx.lineTo(sites[m].x + 0.01, sites[m].y + 0.01);
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.strokeStyle = 'white';
            ctx.stroke();
            ctx.closePath();
        }*/
        $(canvas).remove();
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
            context.fillText(text, background.getStage().getWidth() / 2, 50);
        }

        function hidePolygons(obj){
            for (key in obj){
                obj[key].hide();
            }
        }

        function initStage(images) {

            var stage = stg;
            var background = new Kinetic.Layer();
            var animalLayer = new Kinetic.Layer();
            var layerOfPolygons = layer;

            hidePolygons(polygons);
            var score = 0;

            // image positions
            var animalsBoundaryPoints = getBoundaryPoints(Coords);
            var A = getRandomPositionOfImages(Coords, animalsBoundaryPoints);
            var outlines = A.out1;
            var animals = A.out2;

            function getRandomPositionOfImages(coordsObject, animalsBBox){
                function shuffle(array) {
                    var currentIndex = array.length
                        , temporaryValue
                        , randomIndex
                        ;

                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {

                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }

                    return array;
                }
                function getBlocksCoords(params) {
                    function allBlocksFit(blocks_temp) {
                        for(var jn = 0, lenn = blocks_temp.length; jn < lenn; jn++) {
                            if(blocks_temp[jn].noFit) return false;
                        }
                        return true;
                    }
                    var blocks_ = [];
                    var i = 0;
                    for(var key_ in animalsBBox) {
                        blocks_[i] = {
                            w: animalsBBox[key_].width,
                            h: animalsBBox[key_].height,
                            topLeft: animalsBBox[key_].topLeft,
                            blockKey: key_ + ""
                        };
                        i++;
                    }
                    shuffle(blocks_);
                    // create the Rectangle Packer object
                    var packer = new NETXUS.RectanglePacker(params.packerWidth, params.packerHeight);
                    var boxMargin = {
                            marginX: 0,
                            marginY: 0
                        },
                        coords;
                    // process all the blocks
                    for (var n=0; n<blocks_.length; n++) {
                        // obtain the coordinates for the current block
                        coords = packer.findCoords( blocks_[n].w, blocks_[n].h );
                        blocks_[n].fit = {};
                        if (coords) {
                            blocks_[n].fit.x = coords.x;
                            blocks_[n].fit.y = coords.y;
                        } else {
                            blocks_[n].noFit = true;
                        }
                    }
                    var blocks_next = [];
                    for(var jx in blocks_) {
                        blocks_next[jx] = {
                            w: blocks_[jx].w,
                            h: blocks_[jx].h
                        }
                        blocks_next[jx].fit = {};
                        blocks_next[jx].noFit = blocks_[jx].noFit;
                    }
                    while(allBlocksFit(blocks_next)) {
                        packer = new NETXUS.RectanglePacker(params.packerWidth, params.packerHeight);
                        boxMargin.marginX += 5;
                        boxMargin.marginY += 5;
                        for(var jy in blocks_next) {
                            blocks_[jy].fit.x = blocks_next[jy].fit.x;
                            blocks_[jy].fit.y = blocks_next[jy].fit.y;
                            blocks_[jy].noFit = blocks_next[jy].noFit;
                        }
                        for (var n1=0; n1<blocks_next.length; n1++) {
                            // obtain the coordinates for the current block
                            coords = packer.findCoords( blocks_next[n1].w + boxMargin.marginX, blocks_next[n1].h + boxMargin.marginY);
                            blocks_next[n1].noFit = false;
                            if (coords) {
                                blocks_next[n1].fit.x = coords.x;
                                blocks_next[n1].fit.y = coords.y;
                            } else {
                                blocks_next[n1].noFit = true;
                            }
                        }
                    }
                    //console.log(boxMargin);
                    if( !allBlocksFit(blocks_) ) alert("Some block has noFit = true");
                    return blocks_;
                }
                var borderRight = stage.width()/2;
                var borderBottom = stage.height()/2;

                xCoord = borderRight/2 + imageWidth/2;
                yCoord = borderBottom - imageHeight/2;

                var outlines = {
                    white_coords: {
                        x:xCoord,
                        y:yCoord
                    }
                };
                var animals = {};

                //blocks needed to calculate positions of rectangles
                var offsets = {
                    offsetY: 150,
                    offsetX: 5
                }
                var params = {
                    packerWidth: xCoord,
                    packerHeight: 2 * borderBottom - offsets.offsetY
                }
                var blocks = getBlocksCoords(params);

                ////////////////////////////////////////////////////////////////////
                /*var packer = new Packer(borderRight, 2 * borderBottom - offsets.offsetY);
                packer.fit(blocks);*/
                ////////////////////////////////////////////////////////////////////
                for(var ind = 0, len4 = blocks.length; ind < len4; ind++) {
                    var key0 = blocks[ind].blockKey;
                    animals[key0] = {};
                    animals[key0].x = (blocks[ind].fit.x - blocks[ind].topLeft.x) + offsets.offsetX;
                    animals[key0].y = (blocks[ind].fit.y - blocks[ind].topLeft.y) + offsets.offsetY;
                }

                for (key in coordsObject) {
                    outlines[key +'_coords'] = {};
                    outlines[key+'_coords'].x = xCoord;
                    outlines[key+'_coords'].y = yCoord;
                }
                //console.log(animals);
                //console.log(blocks);

                return {
                    out1:outlines,
                    out2:animals
                };
            }

            function getBoundaryPoints(coordsObject) {
                return (function(coordsObject){
                    animalsBoundaryPoints = {};
                    var data,
                        w = dolphin.width,
                        h = dolphin.height;
                    var canvas = document.getElementById('calculatePositionsLayer');
                    $(canvas).attr("width", w);
                    $(canvas).attr("height", h);
                    var ctx = canvas.getContext('2d');

                    for(var key_ in coordsObject) {
                        ctx.clearRect(0, 0, w, h);
                        ctx.drawImage(images[key_], 0, 0);
                        animalsBoundaryPoints[key_] = {
                            top: {},
                            bottom: {},
                            left: {},
                            right: {}
                        };
                        data = ctx.getImageData(0, 0, w, h).data;
                        var x, y;
                        //finds top point
                        for(var k1 = 0, len = data.length; k1 < len; k1 += 4) {
                            if(data[k1 + 3] != 0) {
                                y = Math.floor(k1 / (4 * w));
                                x = k1/4 - y*w;
                                animalsBoundaryPoints[key_].top.x = x;
                                animalsBoundaryPoints[key_].top.y = y;
                                break;
                            }
                        }
                        //finds bottom point
                        for(var k2 = data.length - 4; k2 > 0; k2 -= 4) {
                            if(data[k2 + 3] != 0) {
                                y = Math.floor(k2 / (4 * w));
                                x = k2/4 - y*w;
                                animalsBoundaryPoints[key_].bottom.x = x;
                                animalsBoundaryPoints[key_].bottom.y = y;
                                break;
                            }
                        }
                        //finds left point
                        left:
                            for(var x1 = 0; x1 < w; x1++) {
                                for(var y1 = 0; y1 < h; y1++) {
                                    if(data[((w * y1) + x1) * 4 + 3] != 0) {
                                        animalsBoundaryPoints[key_].left.x = x1;
                                        animalsBoundaryPoints[key_].left.y = y1;
                                        break left;
                                    }
                                }
                            }
                        //finds right point
                        right:
                            for(var x2 = w - 1; x2 >= 0; x2--) {
                                for(var y2 = h - 1; y2 >= 0; y2--) {
                                    if(data[((w * y2) + x2) * 4 + 3] != 0) {
                                        animalsBoundaryPoints[key_].right.x = x2;
                                        animalsBoundaryPoints[key_].right.y = y2;
                                        break right;
                                    }
                                }
                            }

                        //adds width; height; topLeft point to animalsBoundaryPoints[key]
                        var animal_ = animalsBoundaryPoints[key_];
                        animal_.topLeft = {
                            x: animal_.left.x,
                            y: animal_.top.y
                        };
                        animal_.width = animal_.right.x - animal_.left.x;
                        animal_.height = animal_.bottom.y - animal_.top.y;
                    }
                    $(canvas).remove();
                    return animalsBoundaryPoints;
                })(coordsObject);

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
                            //console.log(privKey);
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
                    //animalShapes.push(animal);
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
            width: 2000,
            height: 1000
        });
        var layer = new Kinetic.Layer();

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
        var sites = getSitesArr(dolphin);
        window.coords = Coords = voronoiCoordinates(sites);
        drawImage(this);
        //----------------------------------------
        getSourses(Coords);
        //----------------------------------------
    };
})



