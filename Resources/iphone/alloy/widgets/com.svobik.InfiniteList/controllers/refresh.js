function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
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
            $.rfImage.animate({
                transform: rotation,
                duration: 180
            });
            $.rfMessage.text = getMessage(e.active);
        }
    }
    function pullendListener() {
        if (false === options.inProgress) {
            options.inProgress = true;
            $.rfImage.hide();
            $.rfActivityIndicator.show();
            $.rfMessage.text = options.loadingMsg;
            options.element.setContentInsets({
                top: 65
            }, {
                animated: true
            });
            refresh();
        }
    }
    function createRefreshView() {
        $.rfMessage.text = getMessage();
        $.rfTimestamp.text = getTimestamp();
        return $.getView();
    }
    function refresh() {
        try {
            return options.onRefresh();
        } catch (err) {
            alert("Loading error!");
        } finally {
            reset();
        }
    }
    function reset() {
        $.rfActivityIndicator.hide();
        $.rfImage.transform = Ti.UI.create2DMatrix();
        $.rfImage.show();
        $.rfMessage.text = getMessage(false);
        $.rfTimestamp.text = getTimestamp();
        options.element.setContentInsets({
            top: 0
        }, {
            animated: true
        });
        options.inProgress = false;
    }
    function init(_options) {
        _.extend(options, _options);
        if (false !== options.element) {
            options.element.addEventListener("pull", pullListener);
            options.element.addEventListener("pullend", pullendListener);
            options.element.setPullView(createRefreshView());
        }
    }
    new (require("alloy/widget"))("com.svobik.InfiniteList");
    this.__widgetId = "com.svobik.InfiniteList";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "refresh";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.rfView = Ti.UI.createView({
        id: "rfView",
        height: Ti.UI.SIZE
    });
    $.__views.rfView && $.addTopLevelView($.__views.rfView);
    $.__views.rfActivityIndicator = Ti.UI.createActivityIndicator({
        left: 35,
        bottom: 15,
        width: 30,
        height: 30,
        id: "rfActivityIndicator"
    });
    $.__views.rfView.add($.__views.rfActivityIndicator);
    $.__views.rfImage = Ti.UI.createImageView({
        left: 35,
        bottom: 5,
        image: WPATH("images/arrow.png"),
        height: 60,
        width: 23,
        id: "rfImage"
    });
    $.__views.rfView.add($.__views.rfImage);
    $.__views.rfMessage = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        text: "Pull down to refresh...",
        textAlign: "center",
        bottom: 30,
        id: "rfMessage"
    });
    $.__views.rfView.add($.__views.rfMessage);
    $.__views.rfTimestamp = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 11
        },
        textAlign: "center",
        bottom: 15,
        id: "rfTimestamp"
    });
    $.__views.rfView.add($.__views.rfTimestamp);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var options = {
        pullMsg: L("pvPullMessage", "Pull to refresh"),
        pulledMsg: L("pvPulledMessage", "Release to refresh"),
        loadingMsg: L("pvLoadingMessage", "Loading new content..."),
        inProgress: false,
        onRefresh: null,
        element: null
    };
    var moment = require("alloy/moment");
    exports.init = init;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;