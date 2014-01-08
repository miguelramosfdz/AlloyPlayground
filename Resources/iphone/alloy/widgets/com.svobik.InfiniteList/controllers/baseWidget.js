function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function getFormattedDate() {
        return moment().format("DD/MM/YYYY HH:mm");
    }
    function getPullViewMessage(pulled) {
        if (pulled) return L("pvPulledMessage");
        return L("pvPullMessage");
    }
    function getPullViewTimestamp() {
        return String.format(L("pvTimestamp"), getFormattedDate());
    }
    function doListItemClick(e) {
        alert("You click me! #" + e.itemIndex);
    }
    function doLoadData(callback) {
        try {
            alert("Loaded");
            return true;
        } catch (err) {
            alert("Error");
            return false;
        } finally {
            callback();
        }
    }
    function loadData() {
        doLoadData(function() {
            resetPullView();
        });
    }
    function resetPullView() {
        $.pvActivityIndicator.hide();
        $.pvImage.transform = Ti.UI.create2DMatrix();
        $.pvImage.show();
        $.pvMessage.text = getPullViewMessage(false);
        $.pvTimestamp.text = getPullViewTimestamp();
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
            $.pvMessage.text = getPullViewMessage(e.active);
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
        $.pvMessage.text = getPullViewMessage();
        $.pvTimestamp.text = getPullViewTimestamp();
    }
    function init() {
        $.listView.addEventListener("pull", pullListener);
        $.listView.addEventListener("pullend", pullendListener);
        $.listView.addEventListener("itemclick", function(e) {
            doListItemClick(e);
        });
        createPullView();
        createListView(20);
    }
    new (require("alloy/widget"))("com.svobik.InfiniteList");
    this.__widgetId = "com.svobik.InfiniteList";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "baseWidget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var moment = require("alloy/moment"), inProgress = false;
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;