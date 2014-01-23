function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik7.DynamicList/" + s : s.substring(0, index) + "/com.svobik7.DynamicList/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function getFormattedDate() {
        return moment().format("DD/MM/YYYY HH:mm");
    }
    function getMessage(pulled) {
        if (pulled) return options.pulledMsg;
        return options.pullMsg;
    }
    function getTimestamp() {
        return String.format(L("pvTimestamp"), getFormattedDate());
    }
    function pullListener(e) {
        if (false === options.inProgress) {
            if (false == e.active) var rotation = Ti.UI.create2DMatrix(); else var rotation = Ti.UI.create2DMatrix().rotate(180);
            $.hvImage.animate({
                transform: rotation,
                duration: 180
            });
            $.hvMessage.text = getMessage(e.active);
        }
    }
    function pullendListener() {
        if (false === options.inProgress) {
            options.inProgress = true;
            $.hvImage.hide();
            $.hvActivityIndicator.show();
            $.hvMessage.text = options.loadingMsg;
            options.element.setContentInsets({
                top: 65
            }, {
                animated: true
            });
            refresh();
        }
    }
    function refresh() {
        options.element.fireEvent("refresh", {
            success: success,
            error: error
        });
    }
    function success(isDone) {
        reset(isDone);
    }
    function error(msg) {
        alert(msg);
        reset(false);
    }
    function createHeaderView() {
        $.hvMessage.text = getMessage();
        $.hvTimestamp.text = getTimestamp();
        return $.getView();
    }
    function reset() {
        $.hvActivityIndicator.hide();
        $.hvImage.transform = Ti.UI.create2DMatrix();
        $.hvImage.show();
        $.hvMessage.text = getMessage(false);
        $.hvTimestamp.text = getTimestamp();
        options.element.setContentInsets({
            top: 0
        }, {
            animated: true
        });
        options.inProgress = false;
    }
    function dettach() {
        if (true === options.isReady) {
            options.element.removeEventListener("pull", pullListener);
            options.element.removeEventListener("pullend", pullendListener);
            options.element.pullView = null;
            options.isReady = false;
        }
    }
    function attach() {
        if (false === options.isReady) {
            options.element.addEventListener("pull", pullListener);
            options.element.addEventListener("pullend", pullendListener);
            options.element.setPullView(createHeaderView());
            options.isReady = true;
        }
    }
    function cancel() {
        dettach();
    }
    function init(_element) {
        if (false === options.isReady) {
            _.extend(options, {
                element: _element
            });
            options.element && attach();
        }
    }
    new (require("alloy/widget"))("com.svobik7.DynamicList");
    this.__widgetId = "com.svobik7.DynamicList";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "header";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.headerView = Ti.UI.createView({
        backgroundColor: "transparent",
        id: "headerView",
        height: Ti.UI.SIZE
    });
    $.__views.headerView && $.addTopLevelView($.__views.headerView);
    $.__views.hvActivityIndicator = Ti.UI.createActivityIndicator({
        left: 35,
        bottom: 15,
        width: 30,
        height: 30,
        id: "hvActivityIndicator"
    });
    $.__views.headerView.add($.__views.hvActivityIndicator);
    $.__views.hvImage = Ti.UI.createImageView({
        left: 35,
        bottom: 5,
        image: WPATH("images/arrow.png"),
        height: 60,
        width: 23,
        id: "hvImage"
    });
    $.__views.headerView.add($.__views.hvImage);
    $.__views.hvMessage = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        textAlign: "center",
        bottom: 30,
        id: "hvMessage"
    });
    $.__views.headerView.add($.__views.hvMessage);
    $.__views.hvTimestamp = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 11
        },
        textAlign: "center",
        bottom: 15,
        id: "hvTimestamp"
    });
    $.__views.headerView.add($.__views.hvTimestamp);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var options = {
        pullMsg: L("pvPullMessage", "Pull to refresh"),
        pulledMsg: L("pvPulledMessage", "Release to refresh"),
        loadingMsg: L("pvLoadingMessage", "Loading new content..."),
        inProgress: false,
        isReady: false,
        element: null
    };
    var moment = require("alloy/moment");
    exports.init = init;
    exports.cancel = cancel;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;