menuConfig = function() {
    var isMobile = !!(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i));
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var menuSize = 12 * screenWidth / 100;
    var panelWidth = 13 * screenWidth / 100;
    var buttonSize = 50 * panelWidth / 100;
    var isShownMenu = 0;
    var menu = {
        init: function() {
            function loadImages(imgSources, callback) {
                var assetDir = '../images/menu/';
                var images = {};
                var loadedImages = 0;
                var numImages = 0;
                for(var src in imgSources) {
                    numImages++;
                }
                for(var src1 in imgSources) {
                    menu[src1] = $("#" + src1);
                    console.log(menu[src1]);
                    menu[src1].on("load", function() {
                        if(++loadedImages >= numImages) {
                            callback();
                        }
                    });
                    menu[src1].attr("src", "" + assetDir + imgSources[src1]);
                }
            }
            function initImagesBehavior() {
                menu.$menuPanel = $("#menuPanel");
                menu.buttons = $("#buttons");

                var windowWidth = 50 * screenWidth / 100;
                var windowHeight = menu.messageWindow.height() * windowWidth/menu.messageWindow.width();
                var messageWindowPosition = {
                    top: screenHeight/2 - menu.messageWindow.height()/2,
                    left: screenWidth/2 - windowWidth/2
                };
                var modalLayer2;

                menu.mainMenu.show();
                menu.mainMenu.css({
                    width: menuSize,
                    position: "absolute",
                    top: panelWidth/2 - menuSize/2,
                    left: panelWidth/2 - menuSize/2
                });
                menu.$menuPanel.css({
                    width: panelWidth + "px",
                    height: screenHeight,
                    marginLeft: - panelWidth + "px"
                });
                menu.buttons.find(".navButton").css({
                    width: buttonSize + "px",
                    marginBottom: 30 * panelWidth / 100 + "px"
                }).show();
                menu.buttons.css({
                    marginLeft: - panelWidth + "px",
                    marginTop: - screenHeight + (panelWidth/2 - menuSize/2) + menuSize * 1.4 + "px"
                });
                menu.messageWindow.css({
                    top: messageWindowPosition.top,
                    left: messageWindowPosition.left,
                    width: windowWidth
                });
                menu.okButton.css({
                    position: "absolute",
                    top: messageWindowPosition.top + 50 * windowHeight / 100 + "px",
                    left: messageWindowPosition.left + 15 * windowWidth / 100 + "px",
                    width: 30 * windowWidth / 100,
                    marginRight: 10 * windowWidth / 100 + "px"
                });
                menu.cancelButton.css({
                    position: "absolute",
                    top: messageWindowPosition.top + 50 * windowHeight / 100 + "px",
                    left: messageWindowPosition.left + 55 * windowWidth / 100 + "px",
                    width: 30 * windowWidth / 100 + "px"
                });
                //////////////////////////////////////////////////////////////////////
                menu.mainMenu.on(isMobile ? "touchend" : "click", function(event) {
                    event.stopPropagation();
                    if(isShownMenu) {
                        menu.hide();
                    } else {
                        menu.show();
                    }
                });
                menu.backButton.on(isMobile ? "touchend" : "click", function() {
                    if($(document.body).attr("class") == "getPuzzle") {
                        document.location.href = localStorage.getItem('environment') + "Environment.html";
                    } else {
                        document.location.href = "environmentChoose.html";
                    }
                });
                menu.okButton.on(isMobile ? "touchend" : "click", function(event) {
                    event.stopPropagation();
                    document.location.href = document.location.href;
                    modalLayer2.remove();
                    menu.show();
                });
                menu.cancelButton.on(isMobile ? "touchend" : "click", function(event) {
                    event.stopPropagation();
                    menu.messageWindow.hide();
                    menu.okButton.hide();
                    menu.cancelButton.hide();
                    modalLayer2.remove();
                    menu.show();
                });
                menu.reloadButton.on(isMobile ? "touchend" : "click", function() {
                    modalLayer2 = $("<div></div>").css({
                        position: "absolute",
                        top: 0,
                        width: screenWidth,
                        height: screenHeight,
                        zIndex: 150,
                        opacity: 1
                    }).appendTo(document.body);
                    menu.messageWindow.show();
                    menu.okButton.show();
                    menu.cancelButton.show();
                    menu.hide();
                });

                $(document).on(isMobile ? "touchend" : "click", function(event) {
                    var target = $(event.target);
                    event.stopPropagation();
                    if(isShownMenu && !(target.is('#menuButton') || target.is('#menuPanel') || target.is('#buttons') ||
                        target.is('.navButton')) ) {
                        menu.hide();
                    }
                    return null;
                });
            }
            var imgSources = {
                messageWindow: "blue_button-555px.png",
                okButton: "orange-button-png.png",
                cancelButton: "orange-button-png.png",
                mainMenu: "btn_menu.png",
                backButton: "btn_back.png",
                reloadButton: "btn_refresh.png"
            };
            loadImages(imgSources, initImagesBehavior);
        },
        show: function() {
            menu.modalLayer1 = $("<div></div>").css({
                position: "absolute",
                top: 0,
                width: screenWidth,
                height: screenHeight,
                zIndex: 80,
                opacity: 1
            }).appendTo(document.body);
            menu.$menuPanel.animate({
                marginLeft: 0
            }, 500);
            menu.buttons.animate({
                marginLeft: panelWidth/2 - buttonSize/2 + "px"
            }, 500);
            isShownMenu = 1;
        },
        hide: function() {
            menu.$menuPanel.animate({
                marginLeft: - 20 * screenWidth / 100 + "px"
            }, 500, function() {
                menu.mainMenu.show();
            });
            menu.buttons.animate({
                marginLeft: - 20 * screenWidth / 100 + "px"
            }, 500);
            isShownMenu = 0;
            menu.modalLayer1.remove();
        }
    };

    menu.init();
};