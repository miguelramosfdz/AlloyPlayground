function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.coverart = Ti.UI.createImageView({
        width: 240,
        height: 240,
        top: 10,
        image: "/dylan.png",
        id: "coverart"
    });
    $.__views.index.add($.__views.coverart);
    $.__views.artist = Ti.UI.createLabel({
        text: "Bob Dylan",
        width: 320,
        height: Ti.UI.SIZE,
        top: 260,
        textAlign: "center",
        font: {
            fontSize: 22,
            fontFamily: "serif",
            fontWeight: "bold"
        },
        color: "black",
        id: "artist"
    });
    $.__views.index.add($.__views.artist);
    $.__views.linernotes = Ti.UI.createLabel({
        width: 240,
        height: 240,
        bottom: 10,
        font: {
            fontSize: 10,
            fontFamily: "serif"
        },
        color: "black",
        text: "Together Through Life is the 33rd studio album by Bob Dylan, released on April 28, 2009, on Columbia Records. The album debuted at number one in several countries, including the U.S. and the UK. It is Dylan's first number one in Britain since New Morning in 1970.",
        id: "linernotes"
    });
    $.__views.index.add($.__views.linernotes);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var images = [], notes = [];
    notes[0] = "Together Through Life is the 33rd studio album by Bob Dylan, released on April 28, 2009, on Columbia Records. The album debuted at number one in several countries, including the U.S. and the UK. It is Dylan's first number one in Britain since New Morning in 1970.";
    notes[1] = "Rumors of the album, reported in Rolling Stone magazine, came as a surprise, with no official press release until March 16, 2009 ‚Äî less than two months before the album's release date.";
    notes[2] = "In a conversation with music journalist Bill Flanagan, published on Bob Dylan's official website, Flanagan suggested a similarity of the new record to the sound of Chess Records and Sun Records, which Dylan acknowledged as an effect of 'the way the instruments were played.'";
    images[0] = "/dylan.png";
    images[1] = "/dylan1.png";
    images[2] = "/dylan2.png";
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;