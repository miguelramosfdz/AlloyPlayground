function Controller() {
    function __alloyId18(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId18.opts || {};
        var models = __alloyId17.models;
        var len = models.length;
        var __alloyId13 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId14 = models[i];
            __alloyId14.__transform = {};
            var __alloyId16 = {
                template: "bookDefault",
                title: {
                    text: "undefined" != typeof __alloyId14.__transform["title"] ? __alloyId14.__transform["title"] : __alloyId14.get("title")
                },
                subtitle: {
                    text: "undefined" != typeof __alloyId14.__transform["subtitle"] ? __alloyId14.__transform["subtitle"] : __alloyId14.get("subtitle")
                }
            };
            __alloyId13.push(__alloyId16);
        }
        opts.animation ? $.__views.bookListSection.setItems(__alloyId13, opts.animation) : $.__views.bookListSection.setItems(__alloyId13);
    }
    function doInit(e) {
        library.reset([ {
            title: "Lord Of The Rings",
            subtitle: "J.R.R. Tolkien"
        }, {
            title: "Hobit",
            subtitle: "J.R.R. Tolkien 2"
        }, {
            title: "Inferno",
            subtitle: "Dan Brown"
        }, {
            title: "Godfather",
            subtitle: "Mario Puzo"
        }, {
            title: "Last Don",
            subtitle: "Mario Puzo 2"
        } ]);
        return e.success();
    }
    function doRefresh(e) {
        setTimeout(function() {
            var result = 10 * Math.random();
            if (result > 3) {
                var model = Alloy.createModel("book", {
                    title: "Book#",
                    subtitle: "Author Name#"
                });
                model.save();
                library.add(model, {
                    at: 0
                });
                return e.success();
            }
            return e.error("Connection failed.");
        }, 2e3);
    }
    function doNext(e) {
        setTimeout(function() {
            var result = 10 * Math.random();
            if (result > 3) {
                var model = Alloy.createModel("book", {
                    title: "Book#",
                    author: "Author Name#"
                });
                library.add(model);
                model.save();
                return e.success();
            }
            return e.error("Connection failed.");
        }, 2e3);
    }
    function doItemClick(e) {
        $.trigger("detail", e);
    }
    function lMenuTapListener(e) {
        Alloy.Globals.leftMenu.toggle(e);
    }
    function rMenuTapListener(e) {
        Alloy.Globals.rightMenu.toggle(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "master";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("Book");
    $.__views.masterWin = Ti.UI.createWindow({
        title: "Main List",
        width: 1400,
        backgroundColor: "white",
        id: "masterWin"
    });
    $.__views.masterWin && $.addTopLevelView($.__views.masterWin);
    $.__views.dlist = Alloy.createWidget("com.svobik7.DynamicList", "widget", {
        id: "dlist",
        __parentSymbol: $.__views.masterWin
    });
    $.__views.dlist.setParent($.__views.masterWin);
    var __alloyId5 = {};
    var __alloyId8 = [];
    var __alloyId10 = {
        type: "Ti.UI.Label",
        bindId: "title",
        properties: {
            top: 10,
            bindId: "title"
        }
    };
    __alloyId8.push(__alloyId10);
    var __alloyId12 = {
        type: "Ti.UI.Label",
        bindId: "subtitle",
        properties: {
            top: 30,
            bindId: "subtitle"
        }
    };
    __alloyId8.push(__alloyId12);
    var __alloyId7 = {
        properties: {
            name: "bookDefault",
            height: "60"
        },
        childTemplates: __alloyId8
    };
    __alloyId5["bookDefault"] = __alloyId7;
    $.__views.bookListSection = Ti.UI.createListSection({
        id: "bookListSection"
    });
    var __alloyId17 = Alloy.Collections["Book"] || Book;
    __alloyId17.on("fetch destroy change add remove reset", __alloyId18);
    var __alloyId19 = [];
    __alloyId19.push($.__views.bookListSection);
    $.__views.bookList = Ti.UI.createListView({
        sections: __alloyId19,
        templates: __alloyId5,
        id: "bookList",
        defaultItemTemplate: "bookDefault"
    });
    $.__views.masterWin.add($.__views.bookList);
    doInit ? $.__views.bookList.addEventListener("init", doInit) : __defers["$.__views.bookList!init!doInit"] = true;
    doRefresh ? $.__views.bookList.addEventListener("refresh", doRefresh) : __defers["$.__views.bookList!refresh!doRefresh"] = true;
    doNext ? $.__views.bookList.addEventListener("next", doNext) : __defers["$.__views.bookList!next!doNext"] = true;
    doItemClick ? $.__views.bookList.addEventListener("itemclick", doItemClick) : __defers["$.__views.bookList!itemclick!doItemClick"] = true;
    $.__views.lMenuBtn = Ti.UI.createButton({
        title: "Menu",
        id: "lMenuBtn",
        top: "-50dp"
    });
    $.__views.masterWin.add($.__views.lMenuBtn);
    $.__views.rMenuBtn = Ti.UI.createButton({
        title: "Menu",
        id: "rMenuBtn",
        top: "-50dp"
    });
    $.__views.masterWin.add($.__views.rMenuBtn);
    exports.destroy = function() {
        __alloyId17.off("fetch destroy change add remove reset", __alloyId18);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    var library = Alloy.Collections.Book;
    $.dlist.init($.bookList);
    $.lMenuBtn.addEventListener("click", lMenuTapListener);
    $.rMenuBtn.addEventListener("click", rMenuTapListener);
    $.masterWin.setLeftNavButton($.lMenuBtn);
    $.masterWin.setRightNavButton($.rMenuBtn);
    __defers["$.__views.bookList!init!doInit"] && $.__views.bookList.addEventListener("init", doInit);
    __defers["$.__views.bookList!refresh!doRefresh"] && $.__views.bookList.addEventListener("refresh", doRefresh);
    __defers["$.__views.bookList!next!doNext"] && $.__views.bookList.addEventListener("next", doNext);
    __defers["$.__views.bookList!itemclick!doItemClick"] && $.__views.bookList.addEventListener("itemclick", doItemClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;