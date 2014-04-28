$(function() {
    //set main in the middle of the screen
    var main = $("main");
    var windowHeight = $(window).height();
    main.css("margin-top", (windowHeight/2 - main.height()/2) + 'px');
})