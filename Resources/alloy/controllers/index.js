function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.entryView = Alloy.createController("entryView", {
        width: Ti.UI.FILL,
        height: "25%",
        top: 0,
        backgroundColor: "#fff",
        id: "entryView",
        __parentSymbol: $.__views.index
    });
    $.__views.entryView.setParent($.__views.index);
    $.__views.graphView = Ti.UI.createWebView({
        width: Ti.UI.FILL,
        height: "75%",
        top: "25%",
        backgroundColor: "#fff",
        url: "/graph.html",
        id: "graphView"
    });
    $.__views.index.add($.__views.graphView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;