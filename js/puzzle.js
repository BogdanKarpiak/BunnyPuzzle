//
//$( document ).ready(
//    function() {

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
                    animals[key].x = -50 + Math.random()*100;
                    animals[key].y = yCoord + Math.random()*400;

                    console.log(key);

                }
                console.log(outlines);
                return {
                    out1:outlines,
                    out2:animals
                };
            }

            //


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

    sources = {
        background: 'sand_2048x1536.jpg',
        white_coords: 'dolphin_big_white.png'
    };

    var imageWidth;
    var imageHeight;

    var Coords = {
        part1: [0, 0, 200, 0, 200, 200, 0, 200],
        part2: [200, 0, 400, 0, 400, 200, 200, 200],
        part3: [400, 0, 600, 0, 600, 200, 400, 200],
        part4: [600, 0, 800, 0, 800, 200, 600, 200],
        part5: [0, 200, 200, 200, 200, 400, 0, 400],
        part6: [200, 200, 400, 200, 400, 400, 200, 400],
        part7: [400, 200, 600, 200, 600, 400, 400, 400],
        part8: [600, 200, 800, 200, 800, 400, 600, 400],
        part9: [0, 400, 200, 400, 200, 800, 0, 800],
       part10: [200, 400, 400, 400, 400, 800, 200, 800],
       part11: [400, 400, 600, 400, 600, 800, 400, 800],
       part12: [600, 400, 800, 400, 800, 800, 600, 800]
    }

    function getSourses(Coords){

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
//});



