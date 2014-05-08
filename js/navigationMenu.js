menuConfig = function() {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var menu = {
        init: function() {
            this.$mainMenu = $("#menuButton").show();
            this.$menuPanel = $("#menuPanel");
            this.buttons = $("#buttons");

            var menuWidth = 12 * screenWidth / 100;
            var panelWidth = 20 * screenWidth / 100;
            this.$mainMenu.css({
                width: menuWidth,
                top: 2 * screenHeight / 100,
                right: 2 * screenHeight / 100,
                height: 40 * menuWidth / 100,
                lineHeight: 40 * menuWidth / 100 + "px",
                fontSize: 25 * menuWidth / 100 + "px"
            });
            this.$menuPanel.css({
                width: 20 * screenWidth / 100 + "px",
                height: screenHeight,
                marginLeft: - panelWidth + "px"
            });

            this.buttons.find(".navButton").css({
                width: 80 * panelWidth / 100 + "px",
                height: 40 * panelWidth / 100 + "px",
                marginBottom: 10 * panelWidth / 100 + "px"
            }).show();
            this.buttons.css({
                padding: 10 * panelWidth / 100 + "px",
                marginLeft: - panelWidth + "px",
                marginTop: screenHeight/2 - menu.buttons.height()/2 - screenHeight + "px",
                lineHeight: 40 * panelWidth / 100 + "px",
                fontSize: 14 * panelWidth / 100 + "px"
            });
        },
        show: function() {
            menu.$mainMenu.hide();
            menu.$menuPanel.animate({
                marginLeft: 0
            }, 500);
            menu.buttons.animate({
                marginLeft: 0
            }, 500);
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
        }
    };

    menu.init();
    var isMobile = !!(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i));
    menu.$mainMenu.on(isMobile ? "touchend" : "click", function() {
        menu.show();
    });
    $(document).on(isMobile ? "touchend" : "click", function(event) {
        var target = $(event.target);
        console.log(target);
        event.stopPropagation();
        if(! (target.is('#menuButton') || target.is('#menuPanel') || target.is('#buttons') ||
            target.is('.navButton')) ) {
            menu.hide();
        }
        return null;
    });
};