function pixelRatioFix(canvas) {
    if (window.devicePixelRatio != 1) {
        var w = canvas.width, h = canvas.height;
        var k = window.devicePixelRatio;
        var ctx = canvas.getContext('2d');
        // Scale the canvas up by two for retina
        canvas.setAttribute('width', w * k );
        canvas.setAttribute('height', h * k);

        $(canvas).css('width', w);
        $(canvas).css('height', h);

        // finally set the scale of the context
        ctx.scale(k, k);
    }
}

function loadImages(sources, callback) {
    var assetDir = '../images/';
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for(var src in sources) {
        numImages++;
    }
    for(var src1 in sources) {
        images[src1] = new Image();
        images[src1].onload = function() {
            if(++loadedImages >= numImages) {
                console.log(images);
                callback(images);

            }
        };
        images[src1].src = assetDir + sources[src1];
    }
}

function initStage(images) {

    var img = images["background_" + environment];
    container.css({
        width: screenWidth,
        height: screenHeight
    });
    var stage = new Kinetic.Stage({
        container: "container",
        width: screenWidth,
        height: screenHeight
    });
    var background = new Kinetic.Layer();
    var animalLayer = new Kinetic.Layer();

    var backgroundImg = new Kinetic.Image({
        x: 0,
        y: 0,
        width: screenWidth,
        height: screenHeight,
        image: img
    });
    background.add(backgroundImg);

    for(var key in outlines) {
        var animal = new Kinetic.Image({
            x: outlines[key].x,
            y: outlines[key].y,
            width: outlines[key].size,
            height: images[key].height*outlines[key].size/images[key].width,
            image: images[key],
            animalKey: key
            //draggable:true
        });
        animalLayer.add(animal);
        animal.cache();
        animal.drawHitFromCache();
        animal.filters([
            Kinetic.Filters.Blur,
            Kinetic.Filters.Brighten
        ]);
        animal.on('mouseover touchstart', function() {
            this.blurRadius(0.2);
            this.brightness(0.1);
            animalLayer.draw();
            document.body.style.cursor = 'pointer';
        });
        animal.on('mouseout touchend', function() {
            this.blurRadius(0);
            this.brightness(0);
            animalLayer.draw();
            document.body.style.cursor = 'default';
        });
        animal.on('click touchstart', function() {
            var animalName = this.attrs.animalKey;
            document.location.href = "animalGetTogether.html?" + animalName;
        });
    }
    stage.add(background);
    stage.add(animalLayer);

    var $navigation = $('#navigation');
    $("ul#navigation li a").css("display", "block");
    $navigation.css("margin-top", ($(window).height()/2 - $navigation.height()/2) + 'px');
}

var container = $("#container");
var environment = container.attr("class");
localStorage.setItem('environment', environment);

var sources =  JSON.parse(localStorage.getItem(''+environment));
var outlines =  JSON.parse(localStorage.getItem('outline_'+environment));
var AssembleredImage = document.location.search.slice(1);

if(AssembleredImage){
    sources["coloredImage_" + AssembleredImage] =  ''+AssembleredImage;
    localStorage.setItem(''+environment, JSON.stringify(sources));
}

var screenWidth = $(window).width();
var screenHeight = $(window).height();
menuConfig();
loadImages(sources, initStage);