/*function pixelRatioFix(canvas) {
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
}*/

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
                //console.log(images);
                callback(images);

            }
        };
        images[src1].src = assetDir + sources[src1];
    }
}

function initStage(images) {

    var bg1ImgObj = images["background_" + environment];
    var bg2ImgObj = images["background_" + environment + "2"];
    var bg3ImgObj = images["background_" + environment + "3"];
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

    var bg1 = new Kinetic.Image({
        x: 0,
        y: 0,
        width: screenWidth,
        height: screenHeight,
        image: bg1ImgObj
    });
    var bg2 = new Kinetic.Image({
        x: 0,
        y: screenHeight - bg2ImgObj.height * screenHeight / 1536,//bg2ImgObj.height * screenWidth/bg2ImgObj.width,
        width: screenWidth,
        height: bg2ImgObj.height * screenHeight / 1536,//* screenWidth/bg2ImgObj.width,
        image: bg2ImgObj
    });
    var bg3 = new Kinetic.Image({
        x: 0,
        y: screenHeight - bg3ImgObj.height * screenHeight / 1536,//bg3ImgObj.height * screenWidth/bg3ImgObj.width,
        width: screenWidth,
        height: bg3ImgObj.height * screenHeight / 1536, //* screenWidth/bg3ImgObj.width,
        image: bg3ImgObj
    });
    animalLayer.add(bg3);
    bg3.cache();
    bg3.drawHitFromCache();

    background.add(bg1);
    background.add(bg2);
    var coeffs = JSON.parse(localStorage.getItem("coeffs"));
    var resizeCoeff = (coeffs[environment].coeff * screenWidth / 100) / images[coeffs[environment].animalKeyToDetermineCoeff].width;
    for(var key in outlines) {
        var animal = new Kinetic.Image({
            x: outlines[key].x * screenWidth / 100,
            y: outlines[key].y * screenHeight / 100,
            width: images[key].width * resizeCoeff,
            height: images[key].height * screenHeight / 1536,// * resizeCoeff;
            image: images[key],
            animalKey: key
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
            var folder = animalName.match(/[^/]*/);
            localStorage.setItem('anim',''+folder);

            document.location.href = "animalGetTogether.html?" + animalName;

        });
    }
    bg3.moveToTop();
    stage.add(background);
    stage.add(animalLayer);

    menuConfig();
}

var container = $("#container");
var environment = container.attr("class");
localStorage.setItem('environment', environment);

var sources =  JSON.parse(localStorage.getItem(''+environment));
var outlines =  JSON.parse(localStorage.getItem('outline_'+environment));
var imageSource = document.location.search.slice(1)
var folder = imageSource.match(/[^/]*/);

var fullImgName = imageSource.slice( ("" + folder).length + 1);
var imgName = fullImgName.slice(13);
var AssembleredImage = '' + folder + '/' + imgName;

if( (!!AssembleredImage) && (AssembleredImage!= "/") ){
    sources[imageSource] =  ''+ folder + '/' + imgName;
    localStorage.setItem(''+environment, JSON.stringify(sources));
    var completedAnimals = JSON.parse(localStorage.getItem("completedAnimals"));
    completedAnimals[environment + "Completed"]++;
    localStorage.setItem('completedAnimals', JSON.stringify(completedAnimals) );
}

var screenWidth = $(window).width();
var screenHeight = $(window).height();

if( JSON.parse(localStorage.getItem(environment + )) == )
loadImages(sources, initStage);