
$( document ).ready(
    function() {

            function voronoiCoordinates(){
                var objectOfCoords = {};
                var canvas = document.getElementById("voronoiCanvas");
                var voronoi = new Voronoi();
                var bbox = {xl:0,xr:800,yt:0,yb:800};
                var sites = [{x:50, y:250}, {x:250, y:210}, {x:600, y:230},{x:650, y:240},
                    {x:60, y:300}, {x:260, y:320}, {x:590, y:310},{x:620, y:290},
                    {x:5, y:500}, {x:254, y:520}, {x:590, y:490},{x:620, y:510}];
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
                        ctx.rect(v.x-2/3,v.y-2/3,2,2);
                    }
                    ctx.fill();
                };

                function getObjectOfCellsCoords(){

                    $.each(diagram.cells,function(index,elem){
                        var cell = $(elem)['0'].halfedges
                        var i,lenght = cell.length;
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
            }

        var imageWidth;
        var imageHeight;

        var Coords =

        voronoiCoordinates();

//            {
//            part1: [0, 0, 200, 0, 200, 200, 0, 200],
//            part2: [200, 0, 400, 0, 400, 200, 200, 200],
//            part3: [400, 0, 600, 0, 600, 200, 400, 200],
//            part4: [600, 0, 800, 0, 800, 200, 600, 200],
//            part5: [0, 200, 200, 200, 200, 400, 0, 400],
//            part6: [200, 200, 400, 200, 400, 400, 200, 400],
//            part7: [400, 200, 600, 200, 600, 400, 400, 400],
//            part8: [600, 200, 800, 200, 800, 400, 600, 400],
//            part9: [0, 400, 200, 400, 200, 800, 0, 800],
//            part10: [200, 400, 400, 400, 400, 800, 200, 800],
//            part11: [400, 400, 600, 400, 600, 800, 400, 800],
//            part12: [600, 400, 800, 400, 800, 800, 600, 800]
//        }

        var sources = {
            background: 'sand_2048x1536.jpg',
            white_coords: 'dolphin_big_white.png'
        };

    function myfunk(){
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
            console.log('x= '+ax + "y="+ ay);
            console.log(outline.x)

            if(ax > o.x - 50 && ax < o.x + 50 && ay > o.y - 50 && ay < o.y + 50) {
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
            context.fillText(text, background.getStage().getWidth() / 2, 40);
        }

        function initStage(images) {

            var stage = new Kinetic.Stage({
                container: 'container',
                width: 1600,
                height: 1300
            });
            var background = new Kinetic.Layer();
            var animalLayer = new Kinetic.Layer();
            var animalShapes = [];
            var score = 0;

            // image positions
            var A = getRandomPositionOfImages(Coords);
            var outlines = A.out1;
            var animals = A.out2;

            function getRandomPositionOfImages(coordsObject){

                var borderRight = stage.width()/2
                var borderBottom = stage.height()/2;


                var xCoord = borderRight/2 + imageWidth/2;
                var yCoord = borderBottom - imageHeight/2;

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
                    outlines[key+'_coords'].y = yCoord;

                    animals[key] = {};
                    animals[key].x = -50 + Math.random()*10;
                    animals[key].y = yCoord + Math.random()*10;

                    console.log(key);

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

                    animal.cache();
                    animal.drawHitFromCache();
                    animal.filters([
                        Kinetic.Filters.Blur,
                        Kinetic.Filters.Brighten
                    ]);

                    animal.on('dragstart', function() {
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
                            animal.setPosition({x:outline.x, y:outline.y});
                            console.log("x= "+outline.x +'and y = '+ outline.y);
                            animalLayer.draw();
                            animal.inRightPlace = true;
                            if(++score >= 4) {
                                var text = 'You win! Enjoy your booty!'
                                drawBackground(background, images.background, text);
                            }

                            // disable drag and drop
                            setTimeout(function() {
                                animal.setDraggable(false);
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
                    animalShapes.push(animal);
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
    }



    function getSourses(Coords){
        console.log(Coords);
        var Images = {};
        var stage2 = new Kinetic.Stage({
            container: 'container2',
            width: 1000,
            height: 1000
        });

        var widthOfImage = 1000;
        var heightOfImage = 1000;



        var layer = new Kinetic.Layer();
        var mainImage = new Image();
        mainImage.src = '../images/dolphin_big.png'

        mainImage.onload = function(){
            imageHeight = this.height;
            imageWidth = this.width;
            $.each(Coords,function(index,value){
                CreatePolygon(value);
            })
        }

        CreatePolygon.counter = 1;
        function CreatePolygon(ArrayofCoords){
            return function(x){
                var poly = new Kinetic.Line({
                    points: ArrayofCoords,
                    fillPatternImage:mainImage,
                    fillPatternOffset:{x:0,y:0},
                    closed:true,
                    draggable:true
                })

                layer.add(poly);

                poly.toImage({
                    width: widthOfImage,
                    height: heightOfImage,
                    callback: function(img) {
                        //$('body').append($(img));
                        Images['part'+x] = img.src;
                        $.extend(sources,Images);
                        layer.draw();
                        if(Object.keys(sources).length == (2 + Object.keys(Coords).length)){
                            myfunk();
                        }
                    }
                });
                layer.remove(poly);
            }(CreatePolygon.counter++)
        }
        stage2.add(layer);
       $("#container2").remove();
    }
      getSourses(Coords);
});



