function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
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
        try {
            options.onRefresh(reset);
        } catch (err) {
            alert("Loading error! " + err);
            reset();
        }
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
    function cancel() {
        true === options.isReady && (options.isReady = false);
    }
    function init(_options) {
        if (false === options.isReady) {
            _.extend(options, _options);
            if (false !== options.element && options.element.sectionCount) {
                var sections = options.element.getSections();
                sections[0].setHeaderView(createheaderView());
                options.element.addEventListener("pull", pullListener);
                options.element.addEventListener("pullend", pullendListener);
                options.isReady = true;
            }
        }
    }
    new (require("alloy/widget"))("com.svobik.InfiniteList");
    this.__widgetId = "com.svobik.InfiniteList";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "header";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.headerView = Ti.UI.createView({
        backgroundColor: "red",
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
        color: "#f00",
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
        color: "#f00",
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
        onRefresh: null,
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