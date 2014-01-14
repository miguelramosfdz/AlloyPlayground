function Controller() {
    function doItemClick(e) {
        $.trigger("detail", e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "master";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.master = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "master"
    });
    $.__views.master && $.addTopLevelView($.__views.master);
    $.__views.ilist = Alloy.createWidget("com.svobik.InfiniteList", "widget", {
        id: "ilist",
        __parentSymbol: $.__views.master
    });
    $.__views.ilist.setParent($.__views.master);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.ilist.init({
        onItemClick: doItemClick
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;