
    $(function() {
        var screenWidth = $(window).width(),
            screenHeight = $(window).height(),

            size = screenWidth/3,
            backgroundSources = {
                background_sea: "backgrounds/sea2.jpg",
                background_beach: "backgrounds/beach2.jpg",
                background_jungles: "backgrounds/jungles2.jpg"
            },

            seaAnimalSourses = {
                "coloredImage_dolphin_big.png":"coloredImage_dolphin_big.png",
                "coloredImage_7.png" :"coloredImage_7.png",
                "coloredImage_13.png":"coloredImage_13.png",

            },

            seaOutlines = {
                "coloredImage_13.png": {
                    x: screenWidth/2.5,
                    y: screenHeight*0.01,
                    size: size
                },
                "coloredImage_dolphin_big.png": {
                    x: screenWidth/15.0,
                    y: screenHeight*0.21,
                    size: size
                },
                "coloredImage_7.png": {
                    x: screenWidth*0.55,
                    y: screenHeight/2,
                    size: size
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
                    y: screenHeight*0.1,
                    size: size/1.5
                },
                "10.png": {
                    x: screenWidth*0.25,
                    y: screenHeight*0.01,
                    size: size
                },
                "dolphin_big.png": {
                    x: screenWidth*0.5,
                    y: screenHeight*0.3,
                    size: size
                }
            },

            junglesAnimalSources = {
                "11.png": "11.png",
                "2.png":"2.png"
            },

            junglesOutlines = {
                "2.png": {
                    x: screenWidth*0.05,
                    y: screenHeight*0.01,
                    size: size
                },
                "11.png": {
                    x: screenWidth*0.5,
                    y: screenHeight*0.4,
                    size: size
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

        setLocalStorage('jungles','outline_jungles',$.extend(backgroundSources,junglesAnimalSources),junglesOutlines);
        setLocalStorage('sea','outline_sea',$.extend(backgroundSources,seaAnimalSourses),seaOutlines);
        setLocalStorage('beach','outline_beach',$.extend(backgroundSources,beachAnimalSourses),beachOutlines);

        function setLocalStorage (key1,key2,object1,object2){
            localStorage.setItem(key1, JSON.stringify(object1));
            localStorage.setItem(key2, JSON.stringify(object2));
        }
    });