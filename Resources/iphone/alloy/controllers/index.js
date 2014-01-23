function Controller() {
    function openDetail(e) {
        var controller = true && Alloy.isTablet ? $.detail : Alloy.createController("detail");
        var win = controller.getView();
        controller.init(e.itemIndex);
        true && Alloy.isHandheld && Alloy.Globals.navgroup.openWindow(win);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.leftMenu = Alloy.createWidget("com.svobik7.SlideMenu", "widget", {
        id: "leftMenu",
        position: "left",
        width: "250",
        duration: "250"
    });
    $.__views.leftMenu && $.addTopLevelView($.__views.leftMenu);
    $.__views.rightMenu = Alloy.createWidget("com.svobik7.SlideMenu", "widget", {
        id: "rightMenu",
        position: "right",
        width: "250",
        duration: "100"
    });
    $.__views.rightMenu && $.addTopLevelView($.__views.rightMenu);
    if (true && Alloy.isTablet) {
        $.__views.master = Alloy.createController("master", {
            id: "master"
        });
        $.__views.detail = Alloy.createController("detail", {
            id: "detail"
        });
        $.__views.index = Ti.UI.iPad.createSplitWindow({
            left: 0,
            zIndex: 10,
            width: Ti.UI.FILL,
            masterView: $.__views.master.getViewEx({
                recurse: true
            }),
            detailView: $.__views.detail.getViewEx({
                recurse: true
            }),
            id: "index"
        });
        $.__views.index && $.addTopLevelView($.__views.index);
    }
    if (true && !Alloy.isTablet) {
        $.__views.master = Alloy.createController("master", {
            id: "master"
        });
        $.__views.index = Ti.UI.iOS.createNavigationWindow({
            left: 0,
            zIndex: 10,
            width: Ti.UI.FILL,
            window: $.__views.master.getViewEx({
                recurse: true
            }),
            id: "index"
        });
        $.__views.index && $.addTopLevelView($.__views.index);
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.master.on("detail", openDetail);
    true && Alloy.isHandheld && (Alloy.Globals.navgroup = $.index);
    $.leftMenu.init({
        element: $.index
    });
    $.rightMenu.init({
        element: $.index
    });
    $.leftMenu.on("slidemenu:open", function() {
        alert("Left menu is open");
    });
    $.leftMenu.on("slidemenu:close", function() {
        alert("Left menu is closed");
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;