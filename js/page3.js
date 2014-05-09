$(function(){
    var $bxslider = $('.bxslider');
    var width = 80*(2048)*$(window).height()/(1536*$(window).width());
    console.log(width);
    $('#slider').css({
        width: width +'%'
    });

    $bxslider.bxSlider({
        displaySlideQty : 5,
        prevText : "",
        nextText : "",
        moveSlideQty : 5,
        infiniteLoop :  false
    })
    $("#slider").show("fade");

    var moving;
    $bxslider.on('touchmove',function(e){
        moving = true;
    });
    $bxslider.on('touchend',function(e){
        if (!moving) {
            document.location.href = ($(e.target).attr('screen')) + "Environment.html";
        }
        moving = 0;
    })
    var isMobile = !!(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i));
    if(!isMobile){
        $bxslider.on("click", function(e) {
            document.location.href = ($(e.target).attr('screen')) + "Environment.html";
        })
    }
})
