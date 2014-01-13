function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function createItems(_limit) {
        var items = [];
        var itemsCount = $.listSection.getItems().length;
        Ti.API.log("ItemsCount: " + itemsCount);
        for (var i = itemsCount; itemsCount + _limit > i; i++) {
            var item = {
                heading: {
                    text: "Heading " + i
                },
                excerpt: {
                    text: "This is short excerpt #" + i
                }
            };
            items.push(item);
        }
        return items;
    }
    function doCreateList() {
        var items = createItems(20);
        $.listSection.setItems(items);
    }
    function doRefresh(callback) {
        setTimeout(function() {
            var items = createItems(10);
            $.listSection.insertItemsAt(0, items);
            callback(!items.length);
        }, 2500);
    }
    function doLoadNext(callback) {
        setTimeout(function() {
            var items = createItems(10);
            $.listSection.appendItems(items);
            callback(!items.length);
        }, 2500);
    }
    function doItemClick(e) {
        alert("You clicked me! #" + e.itemIndex);
    }
    function cancel() {
        var headerController = Widget.createController("header");
        headerController.cancel();
        var footerController = Widget.createController("footer");
        footerController.cancel();
        $.listView.removeEventListener("itemclick");
    }
    function init() {
        options.onCreate();
        var headerController = Widget.createController("header");
        headerController.init({
            element: $.listView,
            onRefresh: options.onRefresh
        });
        var footerController = Widget.createController("footer");
        footerController.init({
            element: $.listView,
            onLoadNext: options.onLoadNext
        });
        $.listView.addEventListener("itemclick", options.onItemClick);
    }
    var Widget = new (require("alloy/widget"))("com.svobik.InfiniteList");
    this.__widgetId = "com.svobik.InfiniteList";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId0 = {};
    var __alloyId3 = [];
    var __alloyId4 = {
        type: "Ti.UI.Label",
        bindId: "heading",
        properties: {
            color: "#000",
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            top: 5,
            font: {
                fontSize: 18,
                fontWeight: "bold"
            },
            bindId: "heading"
        }
    };
    __alloyId3.push(__alloyId4);
    var __alloyId5 = {
        type: "Ti.UI.Label",
        bindId: "excerpt",
        properties: {
            color: "#000",
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            top: 35,
            font: {
                fontSize: 12
            },
            bindId: "excerpt"
        }
    };
    __alloyId3.push(__alloyId5);
    var __alloyId2 = {
        properties: {
            name: "defaultTemplate",
            height: "60"
        },
        childTemplates: __alloyId3
    };
    __alloyId0["defaultTemplate"] = __alloyId2;
    $.__views.listSection = Ti.UI.createListSection({
        id: "listSection"
    });
    var __alloyId7 = [];
    __alloyId7.push($.__views.listSection);
    $.__views.listView = Ti.UI.createListView({
        sections: __alloyId7,
        templates: __alloyId0,
        pullView: void 0,
        footerView: void 0,
        id: "listView",
        defaultItemTemplate: "defaultTemplate"
    });
    $.__views.listView && $.addTopLevelView($.__views.listView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var options = {
        onCreate: doCreateList,
        onRefresh: doRefresh,
        onLoadNext: doLoadNext,
        onItemClick: doItemClick
    };
    exports.init = init;
    exports.cancel = cancel;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;