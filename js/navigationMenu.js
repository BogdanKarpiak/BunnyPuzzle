menuConfig = function() {
    var isMobile = !!(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i));
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var menuSize = 13 * screenWidth / 100;
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

            this.$mainMenu.show();
            this.$mainMenu.css({
                width: menuSize,
                top: 1 * screenHeight / 100,
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
                marginTop: - screenHeight + (screenHeight/100) + menuSize * 1.5 + "px"
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
            menu.reloadButton.on(isMobile ? "touchend" : "click", function() {
                document.location.href = document.location.href;
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