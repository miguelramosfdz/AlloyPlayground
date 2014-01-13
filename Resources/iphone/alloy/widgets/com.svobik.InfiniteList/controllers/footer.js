function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function createFooterView() {
        $.fvMessage.text = "Load next...";
        return $.getView();
    }
    function cancel() {}
    function init(_options) {
        if (false === options.isReady) {
            _.extend(options, _options);
            if (false !== options.element) {
                options.element.setFooterView(createFooterView());
                options.isReady = true;
            }
        }
    }
    new (require("alloy/widget"))("com.svobik.InfiniteList");
    this.__widgetId = "com.svobik.InfiniteList";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "footer";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.footerView = Ti.UI.createView({
        id: "footerView",
        height: Ti.UI.SIZE
    });
    $.__views.footerView && $.addTopLevelView($.__views.footerView);
    $.__views.fvMessage = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: 12
        },
        textAlign: "center",
        id: "fvMessage"
    });
    $.__views.footerView.add($.__views.fvMessage);
    $.__views.fvActivityIndicator = Ti.UI.createActivityIndicator({
        left: 35,
        bottom: 15,
        width: 30,
        height: 30,
        id: "fvActivityIndicator"
    });
    $.__views.footerView.add($.__views.fvActivityIndicator);
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
    exports.init = init;
    exports.cancel = cancel;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;