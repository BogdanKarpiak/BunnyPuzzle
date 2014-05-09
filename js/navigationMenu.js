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
            this.$mainMenu = $("#menuButton");
            this.$menuPanel = $("#menuPanel");
            this.buttons = $("#buttons");
            this.backButton = $("#back");
            this.reloadButton = $("#reload");
            this.messageWindow = $("#messageWindow");
            this.okButton = $("#okButton");
            this.cancelButton = $("#cancelButton");
            var windowWidth = 50 * screenWidth / 100;
            var windowHeight = menu.messageWindow.height() * windowWidth/menu.messageWindow.width();
            var messageWindowPosition = {
                top: screenHeight/2 - menu.messageWindow.height()/2,
                left: screenWidth/2 - windowWidth/2
            };

            this.$mainMenu.show();
            this.$mainMenu.css({
                width: menuSize,
                top: panelWidth/2 - menuSize/2,
                left: panelWidth/2 - menuSize/2
            });
            this.$menuPanel.css({
                width: panelWidth + "px",
                height: screenHeight,
                marginLeft: - panelWidth + "px"
            });
            this.buttons.find(".navButton").css({
                width: buttonSize + "px",
                marginBottom: 30 * panelWidth / 100 + "px"
            }).show();
            this.buttons.css({
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
            menu.$mainMenu.on(isMobile ? "touchend" : "click", function() {
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
            menu.okButton.on(isMobile ? "touchend" : "click", function() {
                document.location.href = document.location.href;
            });
            menu.cancelButton.on(isMobile ? "touchend" : "click", function() {
                menu.messageWindow.hide();
                menu.okButton.hide();
                menu.cancelButton.hide();
            });
            menu.reloadButton.on(isMobile ? "touchend" : "click", function() {

                $("<div>").css({
                    position: "absolute",
                    width: screenWidth,
                    height: screenHeight,
                    opacity: 0
                }).appendTo(document.body).moveToTop();
                menu.messageWindow.moveToTop().show();
                menu.okButton.moveToTop().show();
                menu.cancelButton.moveToTop().show();
            });

            $(document).on(isMobile ? "touchend" : "click", function(event) {
                var target = $(event.target);
                event.stopPropagation();
                if(! (target.is('#menuButton') || target.is('#menuPanel') || target.is('#buttons') ||
                    target.is('.navButton')) ) {
                    menu.hide();
                }
                return null;
            });
        },
        show: function() {
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
                menu.$mainMenu.show();
            });
            menu.buttons.animate({
                marginLeft: - 20 * screenWidth / 100 + "px"
            }, 500);
            isShownMenu = 0;
        }
    };

    menu.init();
};