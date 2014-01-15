function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function tapListener() {
        if (false === options.inProgress) {
            options.inProgress = true;
            $.fvActivityIndicator.show();
            $.fvMessage.text = "";
            loadNext();
        }
    }
    function markerListener() {
        $.fvMessage.fireEvent("singletap");
    }
    function createFooterView() {
        $.fvMessage.text = options.tapMsg;
        return $.getView();
    }
    function detectMarker() {
        var marker = {}, sections = options.element.getSections(), items = sections[0].getItems();
        var markerPosition = Math.floor(items.length - options.markerTreshold);
        if (markerPosition > 0 && markerPosition > options.markerPosition) {
            marker.sectionIndex = 0;
            marker.itemIndex = markerPosition;
            options.markerPosition = markerPosition;
        }
        return marker;
    }
    function loadNext() {
        $.trigger("loadNext", reset);
    }
    function reset(isDone) {
        $.fvActivityIndicator.hide();
        if (isDone) $.fvMessage.text = options.doneMsg; else {
            $.fvMessage.text = options.tapMsg;
            options.element.setMarker(detectMarker());
        }
        options.inProgress = false;
    }
    function dettach() {
        $.fvMessage.removeEventListener("singletap");
        options.element.removeEventListener("marker");
        options.element.marker = null;
        options.element.footerView = null;
        options.isReady = false;
    }
    function attach() {
        $.fvMessage.addEventListener("singletap", tapListener);
        options.element.addEventListener("marker", markerListener);
        options.element.setMarker(detectMarker());
        options.element.setFooterView(createFooterView());
        options.isReady = true;
    }
    function cancel() {
        true === options.isReady && dettach();
    }
    function init(_options) {
        if (false === options.isReady) {
            _.extend(options, _options);
            false !== options.element && attach();
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
        backgroundColor: "transparent",
        id: "footerView",
        height: Ti.UI.SIZE
    });
    $.__views.footerView && $.addTopLevelView($.__views.footerView);
    $.__views.fvActivityIndicator = Ti.UI.createActivityIndicator({
        width: 30,
        height: 30,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "fvActivityIndicator"
    });
    $.__views.footerView.add($.__views.fvActivityIndicator);
    $.__views.fvMessage = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: 12
        },
        textAlign: "center",
        id: "fvMessage"
    });
    $.__views.footerView.add($.__views.fvMessage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var options = {
        tapMsg: L("fvTapMessage", "Tap to refresh"),
        doneMsg: L("fvDoneMessage", "No more content"),
        markerPosition: 0,
        markerTreshold: 5,
        inProgress: false,
        isReady: false,
        element: null
    };
    exports.init = init;
    exports.cancel = cancel;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;