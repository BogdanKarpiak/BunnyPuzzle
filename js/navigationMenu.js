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
                var messageWindow = $("#messageWindow");
                var windowButtonsContainer = $("#windowButtonsContainer");
                var okButton = $("#okButton");
                var cancelButton = $("#cancelButton");
                var windowWidth = 50 * screenWidth / 100;
                var windowHeight = messageWindow.height() * windowWidth/messageWindow.width();
                messageWindow.show();
                messageWindow.css({
                    top: screenHeight/2 - messageWindow.height()/2,
                    left: screenWidth/2 - windowWidth/2,
                    width: windowWidth
                });
                /*windowButtonsContainer.css({
                    width: 70 * windowWidth / 100,
                    height: 30 * windowHeight / 100,
                    marginTop: 10 * windowHeight / 100 + "px"
                });*/

                okButton.css({
                    position: "absolute",
                    top: messageWindow.position().top + 50 * windowHeight / 100 + "px",
                    left: messageWindow.position().left + 15 * windowWidth / 100 + "px",
                    width: 30 * windowWidth / 100,
                    //height: 30 * windowHeight / 100,
                    marginRight: 10 * windowWidth / 100 + "px"
                }).click(function() {
                        document.location.href = document.location.href;
                    });
                cancelButton.css({
                    position: "absolute",
                    top: messageWindow.position().top + 50 * windowHeight / 100 + "px",
                    left: messageWindow.position().left + 55 * windowWidth / 100 + "px",
                    width: 30 * windowWidth / 100 + "px",
                    //height: 30 * windowHeight / 100
                }).click(function() {
                        messageWindow.hide();
                        okButton.hide();
                        cancelButton.hide();
                    });
                /*var messageWindow = $("<div></div>").css({
                    width: windowWidth,
                    height: windowHeight,
                    position: "absolute",
                    top: screenHeight/2 - windowHeight/2,
                    left: screenWidth/2 - windowWidth/2,
                    fontSize: 15 * windowHeight / 100 + "px"
                }).addClass("messageWindow").html("Are you sure? All completed puzzles will be lost...");
                var windowButtonsContainer = $("<div>").css({
                    width: 70 * windowWidth / 100,
                    height: 30 * windowHeight / 100,
                    marginTop: 10 * windowHeight / 100 + "px"
                }).addClass("windowButtonsContainer").appendTo(messageWindow);
                $("<div>").css({
                    width: 30 * windowWidth / 100,
                    height: 30 * windowHeight / 100,
                    fontSize: 10 * windowHeight / 100 + "px",
                    lineHeight: 30 * windowHeight / 100 + "px",
                    marginRight: 8 * windowWidth / 100 + "px"
                }).addClass("okButton").addClass("windowButton").html("YES").appendTo(windowButtonsContainer);
                $("<div>").css({
                    width: 30 * windowWidth / 100,
                    height: 30 * windowHeight / 100,
                    fontSize: 10 * windowHeight / 100 + "px",
                    lineHeight: 30 * windowHeight / 100 + "px"
                }).addClass("cancelButton").addClass("windowButton").html("NO").appendTo(messageWindow).appendTo(windowButtonsContainer);
                messageWindow.appendTo(document.body);*/
                //document.location.href = document.location.href;
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