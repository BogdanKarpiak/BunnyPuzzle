$(function(){

    var $window = $(window),
        screenWidth = $window.width(),
        screenHeight = $window.height(),
        $startGame = $('#startGame'),
        $level = $('#level'),
        $levelButton = $('.levelButton');

    $startGame.css({
        height: screenHeight/10,
        width: screenWidth/4,
        lineHeight:screenHeight/10 + 'px',
        fontSize: screenHeight/20 + 'px',
        top: screenHeight/2 - screenHeight/10,
        left: screenWidth*0.55
    })

    $levelButton.css({
        height: screenHeight/10,
        width: screenWidth/4,
        lineHeight:screenHeight/10 + 'px',
        fontSize: screenHeight/20 + 'px',
        marginBottom:screenHeight/50
    });

    $('#years').css({
        height: screenHeight/8,
        width: screenWidth/10,
        bottom: screenWidth/40,
        right: screenWidth/40,
        lineHeight:screenHeight/8 + 'px',
        fontSize: screenHeight/10 + 'px'
    })
    $('#bunnyLogo').css({
        display:'inline',
        left: screenWidth/6,
        top:screenHeight/5,
        width: screenWidth/4
    })
    $('#eachTime').css({
        fontSize: screenHeight/15 + 'px' ,
        lineHeight:screenHeight/15 + 'px',
        bottom: screenWidth/40 + screenHeight/16 - screenHeight/30,
        left: screenWidth/5,
        height: screenHeight/15
    })

    $startGame.on('click touch',function(){
        $startGame.hide();

        $level.css({
            top:screenHeight/2 - $level.height()/2,
            left:screenWidth*0.55
        })
        .show();
    })
        $levelButton.on('click touch',function(){
            document.location.href = 'page3.html'
        })

    var coeffs = {
            sea: {
                coeff: 22,
                animalKeyToDetermineCoeff: "dolphin/coloredImage_dolphin_small.png"
            },
            jungles: {
                coeff: 80,
                animalKeyToDetermineCoeff: "dolphin/coloredImage_dolphin_small.png"
            },
            beach: {
                coeff: 80,
                animalKeyToDetermineCoeff: "dolphin/coloredImage_dolphin_small.png"
            }
        },
        backgroundSources = {
            background_sea: "bg/bg1.jpg",
            background_sea2: "bg/bg2.png",
            background_sea3: "bg/bg3.png",
            background_beach: "backgrounds/beach2.jpg",
            background_jungles: "backgrounds/jungles2.jpg"
        },

        seaAnimalSourses = {
            "dolphin/coloredImage_dolphin_small.png":"dolphin/coloredImage_dolphin_small.png",
            "turtle/coloredImage_turtle_small.png" :"turtle/coloredImage_turtle_small.png",
            "diver/coloredImage_diver_small.png":"diver/coloredImage_diver_small.png",
            "whale/coloredImage_whale_small.png": "whale/coloredImage_whale_small.png",
            "clown_fish/coloredImage_clown_fish_small.png": "clown_fish/coloredImage_clown_fish_small.png",
            "fish/coloredImage_fish_small.png": "fish/coloredImage_fish_small.png",
            "octopus/coloredImage_octopus_small.png": "octopus/coloredImage_octopus_small.png",
            "crab/coloredImage_crab_small.png": "crab/coloredImage_crab_small.png",
            "seahorse/coloredImage_seahorse_small.png": "seahorse/coloredImage_seahorse_small.png",
            "seashell/coloredImage_seashell_small.png": "seashell/coloredImage_seashell_small.png",
            "pearl/coloredImage_pearl_small.png": "pearl/coloredImage_pearl_small.png"
        },

        seaOutlines = {
            "dolphin/coloredImage_dolphin_small.png": {
                x: 10,
                y: 10
            },
            "turtle/coloredImage_turtle_small.png": {
                x: 36,
                y: 3
            },
            "diver/coloredImage_diver_small.png": {
                x: 60,
                y: 7.6
            },
            "whale/coloredImage_whale_small.png": {
                x: 29,
                y: 30
            },
            "clown_fish/coloredImage_clown_fish_small.png": {
                x: 5,
                y: 49
            },
            "fish/coloredImage_fish_small.png": {
                x: 75,
                y: 23
            },
            "octopus/coloredImage_octopus_small.png": {
                x: 22.5,
                y: 58
            },
            "crab/coloredImage_crab_small.png": {
                x: 51.3,
                y: 60.8
            },
            "seahorse/coloredImage_seahorse_small.png": {
                x: 84.6,
                y: 46
            },
            "seashell/coloredImage_seashell_small.png": {
                x: 7.5,
                y: 76.6
            },
            "pearl/coloredImage_pearl_small.png": {
                x: 74.6,
                y: 68.4
            }
        },

        beachAnimalSourses = {
            "5.png":"5.png",
            "10.png" :"10.png",
            'dolphin_big.png':"dolphin_big.png"
        },

        beachOutlines = {
            "5.png": {
                x: screenWidth*0.1,
                y: screenHeight*0.1
            },
            "10.png": {
                x: screenWidth*0.25,
                y: screenHeight*0.01
            },
            "dolphin_big.png": {
                x: screenWidth*0.5,
                y: screenHeight*0.3
            }
        },

        junglesAnimalSources = {
            "11.png": "11.png",
            "2.png":"2.png"
        },

        junglesOutlines = {
            "2.png": {
                x: screenWidth*0.05,
                y: screenHeight*0.01
            },
            "11.png": {
                x: screenWidth*0.5,
                y: screenHeight*0.4
            }
        };

    //setLocalStorage('jungles','outline_jungles',$.extend(backgroundSources,junglesAnimalSources),junglesOutlines);
    setLocalStorage('sea','outline_sea',$.extend(backgroundSources,seaAnimalSourses),seaOutlines);
    //setLocalStorage('beach','outline_beach',$.extend(backgroundSources,beachAnimalSourses),beachOutlines);
    localStorage.setItem("coeffs", JSON.stringify(coeffs));

    function setLocalStorage (key1,key2,object1,object2){
        localStorage.setItem(key1, JSON.stringify(object1));
        localStorage.setItem(key2, JSON.stringify(object2));
    }

    $("#easy ,#hard").on("click", function() {
        var $this = $(this)
        localStorage.setItem('level',$this.attr('points'));
        localStorage.setItem('level_word',$this.attr('level'));
        document.location.href = "page3.html";
    })

})
