(function(){

})()

function loadImages(sources, callback) {
    var assetDir = '../images/';
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
        width: 2048,
        height: 1536
    });
    var background = new Kinetic.Layer();
    var animalLayer = new Kinetic.Layer();
    var animalShapes = [];
    var score = 0;

    // image positions
    var animals = {
    giraffe: {
        x: 10,
        y: 70
        },
    monkey: {
        x: 400,
        y: 70
        },
    lion: {
        x: 800,
        y: 70
        }
    };

    var outlines = {
     white_coords: {
        x: 275,
        y: 400
        },
    giraffe_coords: {
        x: 275,
        y: 968

        },
    monkey_coords: {
        x: 275,
        y: 684
        },
    lion_coords: {
        x: 275,
        y: 400
        }
    };

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

var sources = {
    background: 'sand_2048x1536.jpg',
    white_coords: 'dolphin_big_white.png',
    lion: 'dolphin_big3_01.png',
    monkey: 'dolphin_big3_02.png',
    giraffe: 'dolphin_big3_03.png'
    };
loadImages(sources, initStage);