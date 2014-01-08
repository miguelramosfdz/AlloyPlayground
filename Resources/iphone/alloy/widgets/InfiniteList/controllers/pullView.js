function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "InfiniteList/" + s : s.substring(0, index) + "/InfiniteList/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("InfiniteList");
    this.__widgetId = "InfiniteList";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pullView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.pvView = Ti.UI.createView({
        id: "pvView",
        height: Ti.UI.SIZE
    });
    $.__views.pvView && $.addTopLevelView($.__views.pvView);
    $.__views.pvActivityIndicator = Ti.UI.createActivityIndicator({
        id: "pvActivityIndicator"
    });
    $.__views.pvView.add($.__views.pvActivityIndicator);
    $.__views.pvImage = Ti.UI.createImageView({
        id: "pvImage"
    });
    $.__views.pvView.add($.__views.pvImage);
    $.__views.pvMessage = Ti.UI.createLabel({
        id: "pvMessage"
    });
    $.__views.pvView.add($.__views.pvMessage);
    $.__views.pvTimestamp = Ti.UI.createLabel({
        id: "pvTimestamp"
    });
    $.__views.pvView.add($.__views.pvTimestamp);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;