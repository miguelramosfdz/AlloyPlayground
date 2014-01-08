function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "InfiniteList/" + s : s.substring(0, index) + "/InfiniteList/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function _getFormattedDate() {
        return moment().format("DD/MM/YYYY HH:mm");
    }
    function _getPullViewMessage(pulled) {
        if (pulled) return L("pvPulledMessage");
        return L("pvPullMessage");
    }
    function _getPullViewTimestamp() {
        return String.format(L("pvTimestamp"), _getFormattedDate());
    }
    function _doListItemClick(e) {
        alert("You click me! #" + e.itemIndex);
    }
    function _doLoadData() {
        alert("Loaded");
    }
    function loadData() {
        _doLoadData(function() {
            resetPullView();
        });
    }
    function resetPullView() {
        $.pvActivityIndicator.hide();
        $.pvImage.transform = Ti.UI.create2DMatrix();
        $.pvImage.show();
        $.pvMessage.text = _getPullViewMessage(false);
        $.pvTimestamp.text = _getPullViewTimestamp();
        $.listView.setContentInsets({
            top: 0
        }, {
            animated: true
        });
        inProgress = false;
    }
    function pullListener(e) {
        if (false === inProgress) {
            if (false == e.active) var rotation = Ti.UI.create2DMatrix(); else var rotation = Ti.UI.create2DMatrix().rotate(180);
            $.pvImage.animate({
                transform: rotation,
                duration: 180
            });
            $.pvMessage.text = _getPullViewMessage(e.active);
        }
    }
    function pullendListener() {
        if (false === inProgress) {
            inProgress = true;
            $.pvImage.hide();
            $.pvActivityIndicator.show();
            $.pvMessage.text = L("pvLoadingMessage");
            $.listView.setContentInsets({
                top: 65
            }, {
                animated: true
            });
            setTimeout(function() {
                loadData();
            }, 4e3);
        }
    }
    function createListView(_data) {
        var items = [];
        for (var i = 0; _data > i; i++) {
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
        $.listSection.setItems(items);
    }
    function createPullView() {
        $.pvMessage.text = _getPullViewMessage();
        $.pvTimestamp.text = _getPullViewTimestamp();
    }
    new (require("alloy/widget"))("InfiniteList");
    this.__widgetId = "InfiniteList";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.pvView = Ti.UI.createView({
        id: "pvView",
        height: Ti.UI.SIZE
    });
    $.__views.pvActivityIndicator = Ti.UI.createActivityIndicator({
        left: 35,
        bottom: 15,
        width: 30,
        height: 30,
        id: "pvActivityIndicator"
    });
    $.__views.pvView.add($.__views.pvActivityIndicator);
    $.__views.pvImage = Ti.UI.createImageView({
        left: 35,
        bottom: 5,
        image: WPATH("images/arrow.png"),
        height: 60,
        width: 23,
        id: "pvImage"
    });
    $.__views.pvView.add($.__views.pvImage);
    $.__views.pvMessage = Ti.UI.createLabel({
        color: "#fff",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        text: "Pull down to refresh...",
        textAlign: "center",
        bottom: 30,
        id: "pvMessage"
    });
    $.__views.pvView.add($.__views.pvMessage);
    $.__views.pvTimestamp = Ti.UI.createLabel({
        color: "#fff",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        font: {
            fontSize: 11
        },
        textAlign: "center",
        bottom: 15,
        id: "pvTimestamp"
    });
    $.__views.pvView.add($.__views.pvTimestamp);
    var __alloyId1 = {};
    var __alloyId4 = [];
    var __alloyId5 = {
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
    __alloyId4.push(__alloyId5);
    var __alloyId6 = {
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
    __alloyId4.push(__alloyId6);
    var __alloyId3 = {
        properties: {
            name: "defaultTemplate",
            height: "60"
        },
        childTemplates: __alloyId4
    };
    __alloyId1["defaultTemplate"] = __alloyId3;
    $.__views.listSection = Ti.UI.createListSection({
        id: "listSection"
    });
    var __alloyId8 = [];
    __alloyId8.push($.__views.listSection);
    $.__views.listView = Ti.UI.createListView({
        sections: __alloyId8,
        templates: __alloyId1,
        pullView: $.__views.pvView,
        id: "listView",
        defaultItemTemplate: "defaultTemplate"
    });
    $.__views.listView && $.addTopLevelView($.__views.listView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var moment = require("alloy/moment"), inProgress = false;
    $.listView.addEventListener("pull", pullListener);
    $.listView.addEventListener("pullend", pullendListener);
    $.listView.addEventListener("itemclick", function(e) {
        _doListItemClick(e);
    });
    createPullView();
    createListView(20);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;