(function(){

    var main = $("main");
    var screenHeight = $(window).height();
    var screenWidth = $(window).width();

    $('.menuButton').css({
        display: "inline-block",
        height:screenHeight*0.17,
        width:screenWidth*0.7,
        fontSize:screenHeight*110/1000,
        lineHeight: screenHeight*0.17 + 'px',
        marginTop: (screenHeight - 4*screenHeight*0.17)/10,
        marginBottom: (screenHeight - 4*screenHeight*0.17)/10
    });
    main.css("margin-top", (screenHeight/2 - main.height()/2) + 'px');

    $("#sea").on("click", function() {
        document.location.href = "seaEnvironment.html";
    })
    $("#jungles").on("click", function() {
        document.location.href = "junglesEnvironment.html";
    })
    $("#beach").on("click", function() {

        document.location.href = "beachEnvironment.html";
    });
    $("#exit,#mainMenu").on("click", function() {
        document.location.href = "startPage.html";
    })

    $("#easy,#medium,#hard").on("click", function() {
        var $this = $(this)
        localStorage.setItem('level',$this.attr('points'));
        localStorage.setItem('level_word',$this.attr('level'));
        document.location.href = "seaEnvironment.html";
    })
})();

