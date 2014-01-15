function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
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
        $.fvMessage.addEventListener("singletap", tapListener);
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
        options.onLoadNext(reset);
    }
    function reset(isDone) {
        $.fvActivityIndicator.hide();
        if (isDone) $.fvMessage.text = options.doneMsg; else {
            $.fvMessage.text = options.tapMsg;
            options.element.setMarker(detectMarker());
        }
        options.inProgress = false;
    }
    function cancel() {
        options.element.rmeoveEventListener("marker");
        $.fvMessage.removeEventListener("singletap");
    }
    function init(_options) {
        if (false === options.isReady) {
            _.extend(options, _options);
            Ti.API.log("Section count: " + options.element.sectionCount);
            if (false !== options.element && options.element.sectionCount) {
                var sections = options.element.getSections();
                sections[0].setFooterView(createFooterView());
                options.element.setMarker(detectMarker());
                options.element.addEventListener("marker", markerListener);
                options.isReady = true;
                Ti.API.log("Footer ready!");
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
        backgroundColor: "#f00",
        id: "footerView",
        height: Ti.UI.SIZE
    });
    $.__views.footerView && $.addTopLevelView($.__views.footerView);
    $.__views.fvActivityIndicator = Ti.UI.createActivityIndicator({
        width: 30,
        height: 30,
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
        onLoadNext: null,
        isReady: false,
        element: null
    };
    exports.init = init;
    exports.cancel = cancel;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;