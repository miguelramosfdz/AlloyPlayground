function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik7.DynamicList/" + s : s.substring(0, index) + "/com.svobik7.DynamicList/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function setOptions(_options) {
        _.extend(options, _options);
    }
    function error(msg) {
        alert(msg);
    }
    function attach() {
        if (false === options.isReady) {
            options.header = Widget.createController("header");
            options.footer = Widget.createController("footer");
            options.header.init(options.list);
            options.footer.init(options.list);
            options.isReady = true;
        }
    }
    function init(_list) {
        if (!_list) return false;
        setOptions({
            list: _list
        });
        options.list.fireEvent("init", {
            success: attach,
            error: error
        });
    }
    var Widget = new (require("alloy/widget"))("com.svobik7.DynamicList");
    this.__widgetId = "com.svobik7.DynamicList";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.dlActivityIndicator = Ti.UI.createActivityIndicator({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "dlActivityIndicator"
    });
    $.__views.dlActivityIndicator && $.addTopLevelView($.__views.dlActivityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var options = {
        list: null,
        header: null,
        footer: null,
        isReady: false
    };
    exports.init = init;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;