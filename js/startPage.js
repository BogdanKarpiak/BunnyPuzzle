
    $(function() {
        var screenWidth = $(window).width(),
            screenHeight = $(window).height(),
            coeffs = {
                sea: {
                    coeff: 35,
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
        //set main in the middle of the screen
        var main = $("main");
        var windowHeight = $(window).height();

        $('.menuButton').css({
            display: "inline-block",
            height:screenHeight*0.17,
            width:screenWidth*0.7,
            fontSize:screenHeight*110/1000,
            lineHeight: screenHeight*0.17 + 'px',
            marginTop: (screenHeight - 4*screenHeight*0.17)/10,
            marginBottom: (screenHeight - 4*screenHeight*0.17)/10
        });

        main.css("margin-top", (windowHeight/2 - main.height()/2) + 'px');
        $("#play").on("click", function() {
            document.location.href = "selectLevel.html";
        });
        $('#level').click(function(){
            document.location.href = "selectLevel.html";
        })

        //setLocalStorage('jungles','outline_jungles',$.extend(backgroundSources,junglesAnimalSources),junglesOutlines);
        setLocalStorage('sea','outline_sea',$.extend(backgroundSources,seaAnimalSourses),seaOutlines);
        //setLocalStorage('beach','outline_beach',$.extend(backgroundSources,beachAnimalSourses),beachOutlines);
        localStorage.setItem("coeffs", JSON.stringify(coeffs));

        function setLocalStorage (key1,key2,object1,object2){
            localStorage.setItem(key1, JSON.stringify(object1));
            localStorage.setItem(key2, JSON.stringify(object2));
        }
    });