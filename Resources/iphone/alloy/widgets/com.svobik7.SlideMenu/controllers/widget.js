function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik7.SlideMenu/" + s : s.substring(0, index) + "/com.svobik7.SlideMenu/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function setOptions(_options) {
        _.extend(options, _options);
        options.position = "right" === options.position ? 1 : 0;
    }
    function createAnimation() {
        return Ti.UI.createAnimation({
            duration: options.duration,
            curve: Ti.UI.ANIMATION_CURVE_EASE_OUT
        });
    }
    function getAnimation() {
        null === options.animation && (options.animation = createAnimation());
        options.animation.left = options.isOpened ? 0 : options.position ? -options.width : options.width;
        return options.animation;
    }
    function onOpenListener() {
        $.trigger("slidemenu:open");
    }
    function onCloseListener() {
        $.smw.hide();
        $.trigger("slidemenu:close");
    }
    function freezeParent(e) {
        if (e.source) {
            options.icelayer = Ti.UI.createView({
                height: Ti.UI.FILL,
                backgroundColor: "blue",
                opacity: .5
            });
            options.icelayer.addEventListener("click", close);
            e.source.getParent().add(options.icelayer);
        }
    }
    function thawParent() {
        options.icelayer.removeEventListener("click", close);
        options.icelayer.getParent().remove(options.icelayer);
        options.icelayer = null;
    }
    function open(e) {
        $.smw.show();
        options.element.applyProperties({
            width: screenWidth
        });
        freezeParent(e);
        options.element.animate(getAnimation(), onOpenListener);
        options.isOpened = true;
    }
    function close(e) {
        thawParent(e);
        options.element.animate(getAnimation(), onCloseListener);
        options.isOpened = false;
    }
    function toggle(e) {
        options.isOpened ? close(e) : open(e);
    }
    function createView(callback) {
        var properties = {
            width: options.width
        };
        options.position ? properties.right = 0 : properties.left = 0;
        $.smw.applyProperties(properties);
        $.smw.open();
        callback();
    }
    function attach() {
        options.isAttached = true;
    }
    function dettach() {
        options.element = null;
        options.isAttached = false;
    }
    function cancel() {
        options.element && true === options.isAttached && dettach();
    }
    function init(_options) {
        args && _.extend(_options, args);
        setOptions(_options);
        if (options.element && false === options.isAttached) {
            createView(attach);
            Alloy.Globals[options.id] = $;
        }
    }
    new (require("alloy/widget"))("com.svobik7.SlideMenu");
    this.__widgetId = "com.svobik7.SlideMenu";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.smw = Ti.UI.createWindow({
        top: 0,
        zIndex: 1,
        visible: false,
        height: Ti.UI.FILL,
        backgroundColor: "#6f6f6f",
        id: "smw"
    });
    $.__views.smw && $.addTopLevelView($.__views.smw);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        text: "Content goes here!",
        id: "__alloyId0"
    });
    $.__views.smw.add($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var screenWidth = Ti.Platform.displayCaps.platformWidth;
    var options = {
        id: null,
        element: null,
        position: null,
        duration: 200,
        width: 250,
        icelayer: null,
        animation: null,
        isAttached: false,
        isOpened: false
    };
    exports.init = init;
    exports.cancel = cancel;
    exports.open = open;
    exports.close = close;
    exports.toggle = toggle;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;