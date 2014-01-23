function Controller() {
    function init(id) {
        $.message.text = "This is detail #" + id;
    }
    function rMenuTapListener(e) {
        Alloy.Globals.rightMenu.toggle(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.detailWin = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "detailWin"
    });
    $.__views.detailWin && $.addTopLevelView($.__views.detailWin);
    $.__views.message = Ti.UI.createLabel({
        id: "message"
    });
    $.__views.detailWin.add($.__views.message);
    $.__views.rMenuBtn = Ti.UI.createButton({
        title: "Menu",
        id: "rMenuBtn",
        top: "-50dp"
    });
    $.__views.detailWin.add($.__views.rMenuBtn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.init = init;
    $.rMenuBtn.addEventListener("click", rMenuTapListener);
    $.detailWin.setRightNavButton($.rMenuBtn);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;