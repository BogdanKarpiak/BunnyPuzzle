
$( document ).ready(
    function() {

        Array.max = function( array ){
            return Math.max.apply( Math, array );
        };

        Array.min = function( array ){
            return Math.min.apply( Math, array );
        };
        var imageSourse = document.location.search.slice(1);
        //console.log(imageSourse);

    function voronoiCoordinates(sites){

        var objectOfCoords = {};
        var canvas = document.getElementById("voronoiCanvas");
        $(canvas).attr('width',""+imageWidth).attr('height',""+imageHeight);
        canvas.width = canvas.width;
        var voronoi = new Voronoi();
        var bbox = {xl:0,xr:imageWidth ,yt:0,yb:imageHeight };
        var diagram = voronoi.compute(sites, bbox);

        //diagram.vertices

        function render() {
            var ctx = canvas.getContext('2d');
            ctx.drawImage(dolphin,0,0,imageWidth,imageHeight);
            // background
            ctx.globalAlpha = 0.8;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.rect(0,0, canvas.width, canvas.height);
            ctx.fillStyle = 'transparent';
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
            ctx.fillStyle = 'blue';
            var vertices = diagram.vertices,
                iVertex = vertices.length;
            while (iVertex--) {
                v = vertices[iVertex];
                ctx.rect(v.x-3,v.y-3,5,5);
            }
            ctx.fill();
            // sites
            ctx.beginPath();
            ctx.fillStyle = 'red';
            var iSite = sites.length;
            while (iSite--) {
                v = sites[iSite];
                ctx.rect(v.x-2/3,v.y-2/3,5,5);
            }
            ctx.fill();
            //ctx.globalAlpha = 0.7;

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

        //render();

        var variable = getObjectOfCellsCoords();
        return variable

    };

    function DrawPuzzle(stg,layer,polygons,screenHeight,screenWidth,imageHeight,imageWidth){

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
            var ax = a.getX() - a.xChache;
            var ay = Math.abs( -a.getY() + a.yChache);

            var distance = (1 * screenWidth / 100);
            if(ax > o.x - distance && ax < o.x + distance && ay > o.y - distance && ay < o.y + distance) {
                return true;
            }
            else {
                return false;
            }
        }

        function initStage(images) {

            var $navigation = $('#navigation');
            $("ul#navigation li a").css("display", "block");
            $navigation.css("margin-top", ($(window).height()/2 - $navigation.height()/2) + 'px');

            var stage = stg;
            var animalLayer = new Kinetic.Layer();
            var layerOfPolygons = layer;

            var score = 0;
            var square;

            var animalsBoundaryPoints = getBoundaryPoints(Coords);
            var A = getRandomPositionOfImages(Coords, animalsBoundaryPoints);
            var outlines = A.out1;
            var position = A.out2;

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
                function getBlocksCoords(params, boxMargin) {
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
                    var coords;
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
                    if( !allBlocksFit(blocks_) ) {
                        alert("Some block has noFit = true");
                        boxMargin.marginX = 0;
                        boxMargin.marginY = 0;
                        getBlocksCoords(params, boxMargin);
                    }
                    return blocks_;
                }

                var boxMargin = {
                    marginX: 0,
                    marginY: 0
                };
                var offsets = {
                    offsetY: {
                        top: 10 * screenHeight / 100,
                        bottom: 1 * screenHeight / 100
                    },
                    offsetX: 50
                }
                var borderWidth = 1 * screenWidth / 100;
                xCoord = screenWidth - imageWidth - offsets.offsetX + borderWidth;
                yCoord = screenHeight/2  - imageHeight/2;

                var outlines = {
                    white_coords: {
                        x:xCoord,
                        y:yCoord
                    }
                };
                var animals = {};

                var params = {
                    packerWidth: xCoord - offsets.offsetX*2,
                    packerHeight: screenHeight - offsets.offsetY.top - offsets.offsetY.bottom
                }

                /*square = new Kinetic.Rect({
                    width:params.packerWidth + borderWidth,
                    height:params.packerHeight + borderWidth,
                    x: offsets.offsetX - borderWidth/2,
                    y: offsets.offsetY - borderWidth/2,
                    opacity:0.3,
                    fill:'blue',
                    stroke: 'black',
                    strokeWidth: borderWidth
                })
                layerOfPolygons.add(square);*/

                var blocks = getBlocksCoords(params, boxMargin);

                for(var ind = 0, len4 = blocks.length; ind < len4; ind++) {
                    var key0 = blocks[ind].blockKey;
                    animals[key0] = {};
                    animals[key0].x = (blocks[ind].fit.x - blocks[ind].topLeft.x + boxMargin.marginX/2) + offsets.offsetX;
                    animals[key0].y = (blocks[ind].fit.y - blocks[ind].topLeft.y + boxMargin.marginY/2) + offsets.offsetY.top;
                }

                for (key in coordsObject) {
                    outlines[key +'_coords'] = {};
                    outlines[key+'_coords'].x = xCoord;
                    outlines[key+'_coords'].y = yCoord;
                }

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
            for(var key in polygons) {

                // anonymous function to induce scope
                (function(poly) {

                    poly.setPosition({x:position[key].x, y:position[key].y});
                    poly.moveToTop();
                    poly.show();

                    poly.on('dragstart', function() {
                        animalLayer.moveToBottom();
                        this.moveToTop();
                    });

                    poly.on('dragend', function() {
                        var outline = outlines[key + '_coords'];

                        if(!poly.inRightPlace && isNearOutline(poly, outline)) {
                            poly.setPosition({x:xCoord + poly.xChache, y:yCoord + poly.yChache});
                            animalLayer.moveToBottom();
                            layerOfPolygons.draw();

                            poly.inRightPlace = true;
                            if(++score >= Object.keys(polygons).length) {
                                //$("#menuButton").remove();
                                //square.remove();
                                layerOfPolygons.draw();
                                $('body').css({
                                    background: 'url("../images/congratulations.jpg")',
                                    backgroundSize: $(window).width() + 'px '  + $(window).height() + 'px'
                                });
                                $("#menuButton").remove();
                                setTimeout(function(){
                                         document.location.href = localStorage.getItem('environment') +
                                        "Environment.html?"+imageSourse;
                                },3000);
                            }
                                //disable drag and drop
                                poly.setDraggable(false);
                        }
                    });
                })(polygons[key]);
            }

            // anonymous function to induce scope
            var imageObj = images['white_coords'];
            var out = outlines['white_coords'];

            var outline = new Kinetic.Image({
                image: imageObj,
                width: imageWidth,
                height: imageHeight,
                x: out.x,
                y: out.y
            });
            var bg2ImgObj = new Image();
            bg2ImgObj.src = '../images/bg/bg2';
            var bg2 = new Kinetic.Image({
                image: bg2ImgObj,
                width: screenWidth,
                x: screenHeight - bg2ImgObj.height,
                y: out.y
            });
            images = null;
            animalLayer.add(outline);
            layerOfPolygons.draw();
            stage.add(animalLayer);
            menuConfig();
        }
        loadImages(sources, initStage)
   };

    function getSourses(Coords,screenHeight,screenWidth,imageHeight,imageWidth){
    var Images = {};
    var stage = new Kinetic.Stage({
        x:0,
        y:0,
        container: 'container2',
        width: $(window).width() -4.5,
        height: $(window).height() - 4.5
    });
    var layer = new Kinetic.Layer();


    CreatePolygon.counter = 1;
    $.each(Coords,function(index,value){
        CreatePolygon(value,index);
    });

    function CreatePolygon(ArrayofCoords,index){
        function getBoundaryPoints(animalImgObj) {
            return (function(){
                var data,
                    w = imageWidth,
                    h = imageHeight;
                var canvas = $("<canvas></canvas>");
                canvas.attr("width", w);
                canvas.attr("height", h);
                var ctx = canvas.getContext('2d');

                ctx.clearRect(0, 0, w, h);
                ctx.drawImage(animalImgObj, 0, 0);
                var animalBoundaryPoints = {
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
                        animalBoundaryPoints.top.x = x;
                        animalBoundaryPoints.top.y = y;
                        break;
                    }
                }
                //finds bottom point
                for(var k2 = data.length - 4; k2 > 0; k2 -= 4) {
                    if(data[k2 + 3] != 0) {
                        y = Math.floor(k2 / (4 * w));
                        x = k2/4 - y*w;
                        animalBoundaryPoints.bottom.x = x;
                        animalBoundaryPoints.bottom.y = y;
                        break;
                    }
                }
                //finds left point
                left:
                    for(var x1 = 0; x1 < w; x1++) {
                        for(var y1 = 0; y1 < h; y1++) {
                            if(data[((w * y1) + x1) * 4 + 3] != 0) {
                                animalBoundaryPoints.left.x = x1;
                                animalBoundaryPoints.left.y = y1;
                                break left;
                            }
                        }
                    }
                //finds right point
                right:
                    for(var x2 = w - 1; x2 >= 0; x2--) {
                        for(var y2 = h - 1; y2 >= 0; y2--) {
                            if(data[((w * y2) + x2) * 4 + 3] != 0) {
                                animalBoundaryPoints.right.x = x2;
                                animalBoundaryPoints.right.y = y2;
                                break right;
                            }
                        }
                    }

                //adds width; height; topLeft point to animalBoundaryPoints
                var animal_ = animalBoundaryPoints;
                animal_.topLeft = {
                    x: animal_.left.x,
                    y: animal_.top.y
                };
                animal_.width = animal_.right.x - animal_.left.x;
                animal_.height = animal_.bottom.y - animal_.top.y;
                canvas.remove();
                return animalBoundaryPoints;
            })();
        }
        return function(x){
            var poly = new Kinetic.Line({
                points: ArrayofCoords,
                fillPatternImage:dolphin,
                fillPatternScale:{x:dolphin.width/int.width,y:dolphin.height/int.height},
                fillPatternOffset:{x:0,y:0},
                closed:true,
                draggable:true
            });
            var minX,
                minY,
                maxX,
                maxY;
            ArrayX = [];
            ArrayY = [];
            for(var i = 0; i < ArrayofCoords.length; i+= 2){
                ArrayX.push(ArrayofCoords[i]);
                if (i+1 < ArrayofCoords.length) {
                    ArrayY.push(ArrayofCoords[i+1]);
                }
            }


            minX = Array.min(ArrayX);
            minY = Array.min(ArrayY);
            maxX = Array.max(ArrayX);
            maxY = Array.max(ArrayY);

            //console.log(minX + ' ' + minY +' '+ maxX+ ' ' + maxY);

            layer.add(poly);
            poly.cache({
                x : minX,
                y : minY,
                width : maxX - minX,
                height : maxY - minY
            });
            poly.xChache = minX;
            poly.yChache = minY;
            poly.drawHitFromCache();

            paintPolygonBoundaries(poly);
            layer.add(poly);
            objectOfPolygons['part'+x] = poly;
            poly.toImage({
                width: imageWidth,
                height: imageHeight,
                callback: function(img) {
                    Images['part'+x] = img.src;
                    $.extend(sources,Images);
                    layer.draw();
                    if(Object.keys(sources).length == (1 + Object.keys(Coords).length)){
                        Images = null;
                        DrawPuzzle(stage,layer,objectOfPolygons,screenHeight,screenWidth,imageHeight,imageWidth);
                    }
                }
            });
            poly.hide();
        }(CreatePolygon.counter++)
    }
        stage.add(layer);
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

    function resizeSites(args) {
        var sites = [];
        console.log(args);
        for(var ind in args.sites[args.imageSourse][args.level]) {
            sites.push({
                x: args.sites[args.imageSourse][args.level][ind].x * args.imageDim.imageWidth / args.screenDim[args.imageSourse].width,
                y: args.sites[args.imageSourse][args.level][ind].y * args.imageDim.imageHeight / args.screenDim[args.imageSourse].height,
                voronoiId: args.sites[args.imageSourse][args.level][ind].voronoiId
            });
            /*args.sites[args.imageSourse][args.level][ind].x *= $(window).width() / args.screenDim.width;
            args.sites[args.imageSourse][args.level][ind].y *= $(window).height() / args.screenDim.height;*/
        };
        return sites;
    }

    var sources = {};
    var objectOfPolygons = {};
    var counter = 0;
    var imageWidth;
    var imageHeight;
    var Coords;
    var xCoord;
    var yCoord;
    var screenDim = {
        "dolphin/coloredImage_dolphin_small.png": {
            width: 588,
            height: 478
        },
        "turtle/coloredImage_turtle_small.png": {
            width: 588,
            height: 401
        },
        "diver/coloredImage_diver_small.png": {
            width: 655,
            height: 769
        },
        "whale/coloredImage_whale_small.png": {
            width: 655,
            height: 769
        },
        "clown_fish/coloredImage_clown_fish_small.png": {
            width: 655,
            height: 769
        },
        "fish/coloredImage_fish_small.png": {
            width: 655,
            height: 769
        },
        "octopus/coloredImage_octopus_small.png": {
            width: 655,
            height: 769
        },
        "crab/coloredImage_crab_small.png": {
            width: 655,
            height: 769
        },
        "seahorse/coloredImage_seahorse_small.png": {
            width: 655,
            height: 769
        },
        "seashell/coloredImage_seashell_small.png": {
            width: 675,
            height: 789
        },
        "pearl/coloredImage_pearl_small.png": {
            width: 655,
            height: 769
        }
    };

    var sites = {
        "dolphin/coloredImage_dolphin_small.png": {
            easy: [
                {
                    "x": 295,
                    "y": 185,
                    "voronoiId": 1
                },
                {
                    "x": 196,
                    "y": 308,
                    "voronoiId": 4
                },
                {
                    "x": 504,
                    "y": 259,
                    "voronoiId": 3
                },
                {
                    "x": 278,
                    "y": 206,
                    "voronoiId": 2
                },
                {
                    "x": 202,
                    "y": 145,
                    "voronoiId": 0
                }
            ],
            hard: [
                {
                    "x": 233,
                    "y": 163,
                    "voronoiId": 2
                },
                {
                    "x": 419,
                    "y": 322,
                    "voronoiId": 11
                },
                {
                    "x": 439,
                    "y": 220,
                    "voronoiId": 5
                },
                {
                    "x": 342.9085109755397,
                    "y": 253.0335989012383,
                    "voronoiId": 6
                },
                {
                    "x": 142.23640391416848,
                    "y": 108.93993735872209,
                    "voronoiId": 0
                },
                {
                    "x": 375.2590538095683,
                    "y": 330.13608691934496,
                    "voronoiId": 12
                },
                {
                    "x": 314.1735722143203,
                    "y": 219.06134268036112,
                    "voronoiId": 4
                },
                {
                    "x": 146.5320685012266,
                    "y": 271.7012264020741,
                    "voronoiId": 9
                },
                {
                    "x": 247,
                    "y": 289,
                    "voronoiId": 10
                },
                {
                    "x": 453.1392880892381,
                    "y": 369.9299785159528,
                    "voronoiId": 14
                },
                {
                    "x": 142,
                    "y": 184,
                    "voronoiId": 3
                },
                {
                    "x": 276,
                    "y": 335,
                    "voronoiId": 13
                },
                {
                    "x": 232,
                    "y": 139,
                    "voronoiId": 1
                },
                {
                    "x": 383,
                    "y": 270,
                    "voronoiId": 8
                },
                {
                    "x": 255,
                    "y": 256,
                    "voronoiId": 7
                }
            ]
        },
        "turtle/coloredImage_turtle_small.png": {
            easy: [
                {
                    "x": 338,
                    "y": 147,
                    "voronoiId": 0
                },
                {
                    "x": 204,
                    "y": 164,
                    "voronoiId": 2
                },
                {
                    "x": 270,
                    "y": 296,
                    "voronoiId": 5
                },
                {
                    "x": 426,
                    "y": 149,
                    "voronoiId": 1
                },
                {
                    "x": 370,
                    "y": 369,
                    "voronoiId": 6
                },
                {
                    "x": 348,
                    "y": 205,
                    "voronoiId": 4
                },
                {
                    "x": 264,
                    "y": 201,
                    "voronoiId": 3
                }
            ] ,
            hard: [
                {
                    "x": 226,
                    "y": 197,
                    "voronoiId": 8
                },
                {
                    "x": 157,
                    "y": 294,
                    "voronoiId": 16
                },
                {
                    "x": 423,
                    "y": 166,
                    "voronoiId": 5
                },
                {
                    "x": 410,
                    "y": 313,
                    "voronoiId": 17
                },
                {
                    "x": 485,
                    "y": 211,
                    "voronoiId": 10
                },
                {
                    "x": 256,
                    "y": 370,
                    "voronoiId": 19
                },
                {
                    "x": 62,
                    "y": 192,
                    "voronoiId": 7
                },
                {
                    "x": 45,
                    "y": 256,
                    "voronoiId": 13
                },
                {
                    "x": 393,
                    "y": 275,
                    "voronoiId": 14
                },
                {
                    "x": 155.31587036512792,
                    "y": 238.7717655892484,
                    "voronoiId": 11
                },
                {
                    "x": 395.1355411084369,
                    "y": 199.1807906117756,
                    "voronoiId": 9
                },
                {
                    "x": 276,
                    "y": 81,
                    "voronoiId": 1
                },
                {
                    "x": 350.1161291208118,
                    "y": 134.485773491906,
                    "voronoiId": 3
                },
                {
                    "x": 202,
                    "y": 88,
                    "voronoiId": 2
                },
                {
                    "x": 297,
                    "y": 165,
                    "voronoiId": 4
                },
                {
                    "x": 341.2433682717383,
                    "y": 282.7397819797043,
                    "voronoiId": 15
                },
                {
                    "x": 271,
                    "y": 239,
                    "voronoiId": 12
                },
                {
                    "x": 251,
                    "y": 328,
                    "voronoiId": 18
                },
                {
                    "x": 43,
                    "y": 167,
                    "voronoiId": 6
                },
                {
                    "x": 344,
                    "y": 67,
                    "voronoiId": 0
                }
            ]
        },
        "diver/coloredImage_diver_small.png": {
            easy: [
                {
                    "x": 303,
                    "y": 330,
                    "voronoiId": 3
                },
                {
                    "x": 418,
                    "y": 78,
                    "voronoiId": 0
                },
                {
                    "x": 301,
                    "y": 106,
                    "voronoiId": 1
                },
                {
                    "x": 198,
                    "y": 615,
                    "voronoiId": 5
                },
                {
                    "x": 174,
                    "y": 137,
                    "voronoiId": 2
                },
                {
                    "x": 147,
                    "y": 498,
                    "voronoiId": 4
                }
            ],
            hard: [
                {
                    "x": 204,
                    "y": 323,
                    "voronoiId": 9
                },
                {
                    "x": 279,
                    "y": 91,
                    "voronoiId": 0
                },
                {
                    "x": 124.89156513242051,
                    "y": 280.34661091747694,
                    "voronoiId": 7
                },
                {
                    "x": 265,
                    "y": 244,
                    "voronoiId": 5
                },
                {
                    "x": 153,
                    "y": 354,
                    "voronoiId": 10
                },
                {
                    "x": 235.2049715758767,
                    "y": 570.0983521635644,
                    "voronoiId": 13
                },
                {
                    "x": 431.00414463551715,
                    "y": 162.16629684437066,
                    "voronoiId": 3
                },
                {
                    "x": 321,
                    "y": 214,
                    "voronoiId": 4
                },
                {
                    "x": 435,
                    "y": 99,
                    "voronoiId": 1
                },
                {
                    "x": 196.537931910716,
                    "y": 646.745326211676,
                    "voronoiId": 14
                },
                {
                    "x": 558.4072618070059,
                    "y": 132.61974347312935,
                    "voronoiId": 2
                },
                {
                    "x": 118,
                    "y": 454,
                    "voronoiId": 11
                },
                {
                    "x": 429,
                    "y": 315,
                    "voronoiId": 8
                },
                {
                    "x": 138,
                    "y": 523,
                    "voronoiId": 12
                },
                {
                    "x": 113,
                    "y": 250,
                    "voronoiId": 6
                }
            ]
        },
        "whale/coloredImage_whale_small.png": {
            easy: [
                {
                    "x": 295,
                    "y": 185,
                    "voronoiId": 1
                },
                {
                    "x": 196,
                    "y": 308,
                    "voronoiId": 4
                },
                {
                    "x": 504,
                    "y": 259,
                    "voronoiId": 3
                },
                {
                    "x": 278,
                    "y": 206,
                    "voronoiId": 2
                },
                {
                    "x": 202,
                    "y": 145,
                    "voronoiId": 0
                }
            ],
            hard: [
                {
                    "x": 233,
                    "y": 163,
                    "voronoiId": 2
                },
                {
                    "x": 419,
                    "y": 322,
                    "voronoiId": 11
                },
                {
                    "x": 439,
                    "y": 220,
                    "voronoiId": 5
                },
                {
                    "x": 342.9085109755397,
                    "y": 253.0335989012383,
                    "voronoiId": 6
                },
                {
                    "x": 142.23640391416848,
                    "y": 108.93993735872209,
                    "voronoiId": 0
                },
                {
                    "x": 375.2590538095683,
                    "y": 330.13608691934496,
                    "voronoiId": 12
                },
                {
                    "x": 314.1735722143203,
                    "y": 219.06134268036112,
                    "voronoiId": 4
                },
                {
                    "x": 146.5320685012266,
                    "y": 271.7012264020741,
                    "voronoiId": 9
                },
                {
                    "x": 247,
                    "y": 289,
                    "voronoiId": 10
                },
                {
                    "x": 453.1392880892381,
                    "y": 369.9299785159528,
                    "voronoiId": 14
                },
                {
                    "x": 142,
                    "y": 184,
                    "voronoiId": 3
                },
                {
                    "x": 276,
                    "y": 335,
                    "voronoiId": 13
                },
                {
                    "x": 232,
                    "y": 139,
                    "voronoiId": 1
                },
                {
                    "x": 383,
                    "y": 270,
                    "voronoiId": 8
                },
                {
                    "x": 255,
                    "y": 256,
                    "voronoiId": 7
                }
            ]
        },
        "clown_fish/coloredImage_clown_fish_small.png": {
            easy: [
                {
                    "x": 295,
                    "y": 185,
                    "voronoiId": 1
                },
                {
                    "x": 196,
                    "y": 308,
                    "voronoiId": 4
                },
                {
                    "x": 504,
                    "y": 259,
                    "voronoiId": 3
                },
                {
                    "x": 278,
                    "y": 206,
                    "voronoiId": 2
                },
                {
                    "x": 202,
                    "y": 145,
                    "voronoiId": 0
                }
            ],
            hard: [
                {
                    "x": 233,
                    "y": 163,
                    "voronoiId": 2
                },
                {
                    "x": 419,
                    "y": 322,
                    "voronoiId": 11
                },
                {
                    "x": 439,
                    "y": 220,
                    "voronoiId": 5
                },
                {
                    "x": 342.9085109755397,
                    "y": 253.0335989012383,
                    "voronoiId": 6
                },
                {
                    "x": 142.23640391416848,
                    "y": 108.93993735872209,
                    "voronoiId": 0
                },
                {
                    "x": 375.2590538095683,
                    "y": 330.13608691934496,
                    "voronoiId": 12
                },
                {
                    "x": 314.1735722143203,
                    "y": 219.06134268036112,
                    "voronoiId": 4
                },
                {
                    "x": 146.5320685012266,
                    "y": 271.7012264020741,
                    "voronoiId": 9
                },
                {
                    "x": 247,
                    "y": 289,
                    "voronoiId": 10
                },
                {
                    "x": 453.1392880892381,
                    "y": 369.9299785159528,
                    "voronoiId": 14
                },
                {
                    "x": 142,
                    "y": 184,
                    "voronoiId": 3
                },
                {
                    "x": 276,
                    "y": 335,
                    "voronoiId": 13
                },
                {
                    "x": 232,
                    "y": 139,
                    "voronoiId": 1
                },
                {
                    "x": 383,
                    "y": 270,
                    "voronoiId": 8
                },
                {
                    "x": 255,
                    "y": 256,
                    "voronoiId": 7
                }
            ]
        },
        "fish/coloredImage_fish_small.png": {
            easy: [
                {
                    "x": 295,
                    "y": 185,
                    "voronoiId": 1
                },
                {
                    "x": 196,
                    "y": 308,
                    "voronoiId": 4
                },
                {
                    "x": 504,
                    "y": 259,
                    "voronoiId": 3
                },
                {
                    "x": 278,
                    "y": 206,
                    "voronoiId": 2
                },
                {
                    "x": 202,
                    "y": 145,
                    "voronoiId": 0
                }
            ],
            hard: [
                {
                    "x": 233,
                    "y": 163,
                    "voronoiId": 2
                },
                {
                    "x": 419,
                    "y": 322,
                    "voronoiId": 11
                },
                {
                    "x": 439,
                    "y": 220,
                    "voronoiId": 5
                },
                {
                    "x": 342.9085109755397,
                    "y": 253.0335989012383,
                    "voronoiId": 6
                },
                {
                    "x": 142.23640391416848,
                    "y": 108.93993735872209,
                    "voronoiId": 0
                },
                {
                    "x": 375.2590538095683,
                    "y": 330.13608691934496,
                    "voronoiId": 12
                },
                {
                    "x": 314.1735722143203,
                    "y": 219.06134268036112,
                    "voronoiId": 4
                },
                {
                    "x": 146.5320685012266,
                    "y": 271.7012264020741,
                    "voronoiId": 9
                },
                {
                    "x": 247,
                    "y": 289,
                    "voronoiId": 10
                },
                {
                    "x": 453.1392880892381,
                    "y": 369.9299785159528,
                    "voronoiId": 14
                },
                {
                    "x": 142,
                    "y": 184,
                    "voronoiId": 3
                },
                {
                    "x": 276,
                    "y": 335,
                    "voronoiId": 13
                },
                {
                    "x": 232,
                    "y": 139,
                    "voronoiId": 1
                },
                {
                    "x": 383,
                    "y": 270,
                    "voronoiId": 8
                },
                {
                    "x": 255,
                    "y": 256,
                    "voronoiId": 7
                }
            ]
        },
        "octopus/coloredImage_octopus_small.png": {
            easy: [
                {
                    "x": 295,
                    "y": 185,
                    "voronoiId": 1
                },
                {
                    "x": 196,
                    "y": 308,
                    "voronoiId": 4
                },
                {
                    "x": 504,
                    "y": 259,
                    "voronoiId": 3
                },
                {
                    "x": 278,
                    "y": 206,
                    "voronoiId": 2
                },
                {
                    "x": 202,
                    "y": 145,
                    "voronoiId": 0
                }
            ],
            hard: [
                {
                    "x": 233,
                    "y": 163,
                    "voronoiId": 2
                },
                {
                    "x": 419,
                    "y": 322,
                    "voronoiId": 11
                },
                {
                    "x": 439,
                    "y": 220,
                    "voronoiId": 5
                },
                {
                    "x": 342.9085109755397,
                    "y": 253.0335989012383,
                    "voronoiId": 6
                },
                {
                    "x": 142.23640391416848,
                    "y": 108.93993735872209,
                    "voronoiId": 0
                },
                {
                    "x": 375.2590538095683,
                    "y": 330.13608691934496,
                    "voronoiId": 12
                },
                {
                    "x": 314.1735722143203,
                    "y": 219.06134268036112,
                    "voronoiId": 4
                },
                {
                    "x": 146.5320685012266,
                    "y": 271.7012264020741,
                    "voronoiId": 9
                },
                {
                    "x": 247,
                    "y": 289,
                    "voronoiId": 10
                },
                {
                    "x": 453.1392880892381,
                    "y": 369.9299785159528,
                    "voronoiId": 14
                },
                {
                    "x": 142,
                    "y": 184,
                    "voronoiId": 3
                },
                {
                    "x": 276,
                    "y": 335,
                    "voronoiId": 13
                },
                {
                    "x": 232,
                    "y": 139,
                    "voronoiId": 1
                },
                {
                    "x": 383,
                    "y": 270,
                    "voronoiId": 8
                },
                {
                    "x": 255,
                    "y": 256,
                    "voronoiId": 7
                }
            ]
        },
        "crab/coloredImage_crab_small.png": {
            easy: [
                {
                    "x": 295,
                    "y": 185,
                    "voronoiId": 1
                },
                {
                    "x": 196,
                    "y": 308,
                    "voronoiId": 4
                },
                {
                    "x": 504,
                    "y": 259,
                    "voronoiId": 3
                },
                {
                    "x": 278,
                    "y": 206,
                    "voronoiId": 2
                },
                {
                    "x": 202,
                    "y": 145,
                    "voronoiId": 0
                }
            ],
            hard: [
                {
                    "x": 233,
                    "y": 163,
                    "voronoiId": 2
                },
                {
                    "x": 419,
                    "y": 322,
                    "voronoiId": 11
                },
                {
                    "x": 439,
                    "y": 220,
                    "voronoiId": 5
                },
                {
                    "x": 342.9085109755397,
                    "y": 253.0335989012383,
                    "voronoiId": 6
                },
                {
                    "x": 142.23640391416848,
                    "y": 108.93993735872209,
                    "voronoiId": 0
                },
                {
                    "x": 375.2590538095683,
                    "y": 330.13608691934496,
                    "voronoiId": 12
                },
                {
                    "x": 314.1735722143203,
                    "y": 219.06134268036112,
                    "voronoiId": 4
                },
                {
                    "x": 146.5320685012266,
                    "y": 271.7012264020741,
                    "voronoiId": 9
                },
                {
                    "x": 247,
                    "y": 289,
                    "voronoiId": 10
                },
                {
                    "x": 453.1392880892381,
                    "y": 369.9299785159528,
                    "voronoiId": 14
                },
                {
                    "x": 142,
                    "y": 184,
                    "voronoiId": 3
                },
                {
                    "x": 276,
                    "y": 335,
                    "voronoiId": 13
                },
                {
                    "x": 232,
                    "y": 139,
                    "voronoiId": 1
                },
                {
                    "x": 383,
                    "y": 270,
                    "voronoiId": 8
                },
                {
                    "x": 255,
                    "y": 256,
                    "voronoiId": 7
                }
            ]
        },
        "seahorse/coloredImage_seahorse_small.png": {
            easy: [
                {
                    "x": 295,
                    "y": 185,
                    "voronoiId": 1
                },
                {
                    "x": 196,
                    "y": 308,
                    "voronoiId": 4
                },
                {
                    "x": 504,
                    "y": 259,
                    "voronoiId": 3
                },
                {
                    "x": 278,
                    "y": 206,
                    "voronoiId": 2
                },
                {
                    "x": 202,
                    "y": 145,
                    "voronoiId": 0
                }
            ],
            hard: [
                {
                    "x": 233,
                    "y": 163,
                    "voronoiId": 2
                },
                {
                    "x": 419,
                    "y": 322,
                    "voronoiId": 11
                },
                {
                    "x": 439,
                    "y": 220,
                    "voronoiId": 5
                },
                {
                    "x": 342.9085109755397,
                    "y": 253.0335989012383,
                    "voronoiId": 6
                },
                {
                    "x": 142.23640391416848,
                    "y": 108.93993735872209,
                    "voronoiId": 0
                },
                {
                    "x": 375.2590538095683,
                    "y": 330.13608691934496,
                    "voronoiId": 12
                },
                {
                    "x": 314.1735722143203,
                    "y": 219.06134268036112,
                    "voronoiId": 4
                },
                {
                    "x": 146.5320685012266,
                    "y": 271.7012264020741,
                    "voronoiId": 9
                },
                {
                    "x": 247,
                    "y": 289,
                    "voronoiId": 10
                },
                {
                    "x": 453.1392880892381,
                    "y": 369.9299785159528,
                    "voronoiId": 14
                },
                {
                    "x": 142,
                    "y": 184,
                    "voronoiId": 3
                },
                {
                    "x": 276,
                    "y": 335,
                    "voronoiId": 13
                },
                {
                    "x": 232,
                    "y": 139,
                    "voronoiId": 1
                },
                {
                    "x": 383,
                    "y": 270,
                    "voronoiId": 8
                },
                {
                    "x": 255,
                    "y": 256,
                    "voronoiId": 7
                }
            ]
        },
        "seashell/coloredImage_seashell_small.png": {
            easy: [
                {
                    "x": 295,
                    "y": 185,
                    "voronoiId": 1
                },
                {
                    "x": 196,
                    "y": 308,
                    "voronoiId": 4
                },
                {
                    "x": 504,
                    "y": 259,
                    "voronoiId": 3
                },
                {
                    "x": 278,
                    "y": 206,
                    "voronoiId": 2
                },
                {
                    "x": 202,
                    "y": 145,
                    "voronoiId": 0
                }
            ],
            hard: [
                {
                    "x": 233,
                    "y": 163,
                    "voronoiId": 2
                },
                {
                    "x": 419,
                    "y": 322,
                    "voronoiId": 11
                },
                {
                    "x": 439,
                    "y": 220,
                    "voronoiId": 5
                },
                {
                    "x": 342.9085109755397,
                    "y": 253.0335989012383,
                    "voronoiId": 6
                },
                {
                    "x": 142.23640391416848,
                    "y": 108.93993735872209,
                    "voronoiId": 0
                },
                {
                    "x": 375.2590538095683,
                    "y": 330.13608691934496,
                    "voronoiId": 12
                },
                {
                    "x": 314.1735722143203,
                    "y": 219.06134268036112,
                    "voronoiId": 4
                },
                {
                    "x": 146.5320685012266,
                    "y": 271.7012264020741,
                    "voronoiId": 9
                },
                {
                    "x": 247,
                    "y": 289,
                    "voronoiId": 10
                },
                {
                    "x": 453.1392880892381,
                    "y": 369.9299785159528,
                    "voronoiId": 14
                },
                {
                    "x": 142,
                    "y": 184,
                    "voronoiId": 3
                },
                {
                    "x": 276,
                    "y": 335,
                    "voronoiId": 13
                },
                {
                    "x": 232,
                    "y": 139,
                    "voronoiId": 1
                },
                {
                    "x": 383,
                    "y": 270,
                    "voronoiId": 8
                },
                {
                    "x": 255,
                    "y": 256,
                    "voronoiId": 7
                }
            ]
        },
        "pearl/coloredImage_pearl_small.png": {
            easy: [
                {
                    "x": 295,
                    "y": 185,
                    "voronoiId": 1
                },
                {
                    "x": 196,
                    "y": 308,
                    "voronoiId": 4
                },
                {
                    "x": 504,
                    "y": 259,
                    "voronoiId": 3
                },
                {
                    "x": 278,
                    "y": 206,
                    "voronoiId": 2
                },
                {
                    "x": 202,
                    "y": 145,
                    "voronoiId": 0
                }
            ],
            hard: [
                {
                    "x": 233,
                    "y": 163,
                    "voronoiId": 2
                },
                {
                    "x": 419,
                    "y": 322,
                    "voronoiId": 11
                },
                {
                    "x": 439,
                    "y": 220,
                    "voronoiId": 5
                },
                {
                    "x": 342.9085109755397,
                    "y": 253.0335989012383,
                    "voronoiId": 6
                },
                {
                    "x": 142.23640391416848,
                    "y": 108.93993735872209,
                    "voronoiId": 0
                },
                {
                    "x": 375.2590538095683,
                    "y": 330.13608691934496,
                    "voronoiId": 12
                },
                {
                    "x": 314.1735722143203,
                    "y": 219.06134268036112,
                    "voronoiId": 4
                },
                {
                    "x": 146.5320685012266,
                    "y": 271.7012264020741,
                    "voronoiId": 9
                },
                {
                    "x": 247,
                    "y": 289,
                    "voronoiId": 10
                },
                {
                    "x": 453.1392880892381,
                    "y": 369.9299785159528,
                    "voronoiId": 14
                },
                {
                    "x": 142,
                    "y": 184,
                    "voronoiId": 3
                },
                {
                    "x": 276,
                    "y": 335,
                    "voronoiId": 13
                },
                {
                    "x": 232,
                    "y": 139,
                    "voronoiId": 1
                },
                {
                    "x": 383,
                    "y": 270,
                    "voronoiId": 8
                },
                {
                    "x": 255,
                    "y": 256,
                    "voronoiId": 7
                }
            ]
        }
    };
    var dolphin = new Image();
    var folder = imageSourse.match(/[^/]*/);
    var fullImgName = imageSourse.slice( ("" + folder).length + 1);
    var imgName = fullImgName.slice(13);
    dolphin.src = '../images/' + folder + '/' + imgName;

    dolphin.onload = function(){
        int = {};
        int.width = dolphin.width;
        int.height = dolphin.height;
        dolphin.width = dolphin.width/10;
        dolphin.height = dolphin.height/10;
        var outlineDistance = 0.4;
        var paddingOutlineTop = 2/10;
        var paddingOutlineRight = 1/20;
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        if (dolphin.width > dolphin.height){
            dolphin.height = dolphin.height*screenWidth*(outlineDistance - paddingOutlineRight)/dolphin.width;
            dolphin.width = screenWidth*(outlineDistance - paddingOutlineRight);
        }
        else {
            while (dolphin.width <= screenWidth*outlineDistance && dolphin.height <= screenHeight*(1-paddingOutlineTop)){
                dolphin.width = dolphin.width*(dolphin.height+20)/dolphin.height;
                dolphin.height += 20 ;
            }
        }

        imageHeight = dolphin.height;
        imageWidth = dolphin.width;
        var level = localStorage.getItem('level_word');
        var newSites = resizeSites({
            imageDim: {
                imageWidth: imageWidth,
                imageHeight: imageHeight
            },
            screenDim: screenDim,
            imageSourse: imageSourse,
            level: level,
            sites: sites
        });
        window.coords = Coords = voronoiCoordinates(newSites);
        sources['white_coords'] = '../images/coloredImage_'+imageSourse;
        $('#voronoiCanvas').remove();
        var outlineImg = new Image();
        outlineImg.src = '../images/'+imageSourse;
        outlineImg.width = imageWidth;
        outlineImg.height = imageHeight;
        outlineImg.onload = function(){
            drawImage(outlineImg,sources,'white_coords');
            getSourses(Coords,screenHeight,screenWidth,imageHeight,imageWidth);
            $('.menuButton').remove();
        }
    };
})
