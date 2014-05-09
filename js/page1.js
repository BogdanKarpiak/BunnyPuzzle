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

})
