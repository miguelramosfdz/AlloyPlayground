function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function doInit(callback) {
        options.onInit(function(items) {
            $.lvActivityIndicator.hide();
            $.listSection.setItems(items);
            $.listWrapper.show();
            callback();
        });
    }
    function doRefresh(callback) {
        options.onRefresh(function(items) {
            $.listSection.insertItemsAt(0, items);
            callback(!items.length);
        });
    }
    function doLoadNext(callback) {
        options.onLoadNext(function(items) {
            $.listSection.appendItems(items);
            callback(!items.length);
        });
    }
    function doItemClick(e) {
        options.onItemClick(e);
    }
    function setOptions(_options) {
        delete _options.__parentSymbol;
        delete _options.__itemTemplate;
        delete _options.$model;
        _.extend(options, _options);
    }
    function create() {
        $.listView.addEventListener("itemclick", doItemClick);
        options.header = Widget.createController("header");
        options.footer = Widget.createController("footer");
        options.header.init({
            element: $.listView
        });
        options.footer.init({
            element: $.listView
        });
        options.header.on("refresh", doRefresh);
        options.footer.on("loadNext", doLoadNext);
    }
    function init(_options) {
        $.listWrapper.hide();
        $.lvActivityIndicator.show();
        setOptions(_options);
        if (null === options.onInit || null === opitons.onRefresh || null === options.onLoadNext) {
            var loader = require(WPATH("loader"));
            options.onInit = null === options.onInit ? loader.init : options.onInit;
            options.onRefresh = null === options.onRefresh ? loader.refresh : options.onRefresh;
            options.onLoadNext = null === options.onLoadNext ? loader.loadNext : options.onLoadNext;
        }
        doInit(create);
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
    $.__views.lvActivityIndicator = Ti.UI.createActivityIndicator({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "lvActivityIndicator"
    });
    $.__views.lvActivityIndicator && $.addTopLevelView($.__views.lvActivityIndicator);
    $.__views.listWrapper = Ti.UI.createView({
        id: "listWrapper"
    });
    $.__views.listWrapper && $.addTopLevelView($.__views.listWrapper);
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
    $.__views.listWrapper.add($.__views.listView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var options = {
        onInit: null,
        onRefresh: null,
        onLoadNext: null,
        onItemClick: null,
        header: null,
        footer: null
    };
    exports.init = init;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;