function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "entryView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.eView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 0,
        backgroundColor: "#fff",
        id: "eView"
    });
    $.__views.eView && $.addTopLevelView($.__views.eView);
    $.__views.lbl = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 20,
        right: 20,
        top: 10,
        color: "#000",
        id: "lbl",
        text: "New Values:"
    });
    $.__views.eView.add($.__views.lbl);
    $.__views.wrapper = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        left: 20,
        right: 20,
        top: 50,
        id: "wrapper"
    });
    $.__views.eView.add($.__views.wrapper);
    $.__views.a = Ti.UI.createTextField({
        width: "50dp",
        height: "40dp",
        left: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        borderRadius: 6,
        textAlign: "center",
        id: "a",
        hintText: "iOS"
    });
    $.__views.wrapper.add($.__views.a);
    $.__views.b = Ti.UI.createTextField({
        width: "50dp",
        height: "40dp",
        left: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        borderRadius: 6,
        textAlign: "center",
        id: "b",
        hintText: "Android"
    });
    $.__views.wrapper.add($.__views.b);
    $.__views.c = Ti.UI.createTextField({
        width: "50dp",
        height: "40dp",
        left: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        borderRadius: 6,
        textAlign: "center",
        editable: false,
        id: "c",
        hintText: "Other"
    });
    $.__views.wrapper.add($.__views.c);
    $.__views.submit = Ti.UI.createButton({
        title: "Update",
        width: Ti.UI.SIZE,
        height: "40dp",
        left: 10,
        id: "submit"
    });
    $.__views.wrapper.add($.__views.submit);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var updateWebView = function() {
        $.a.blur();
        $.b.blur();
        Ti.App.fireEvent("updateGraph", {
            a: Math.floor(parseInt($.a.value)),
            b: Math.floor(parseInt($.b.value)),
            c: Math.floor(parseInt($.c.value))
        });
    };
    var calcC = function() {
        $.c.value = String(Math.round(100 - $.a.value - $.b.value));
    };
    $.submit.addEventListener("click", updateWebView);
    $.a.addEventListener("change", calcC);
    $.b.addEventListener("change", calcC);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;