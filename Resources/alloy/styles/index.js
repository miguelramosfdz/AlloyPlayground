module.exports = [ {
    isClass: true,
    priority: 10000.0009,
    key: "container",
    style: {
        backgroundColor: "white"
    }
}, {
    isId: true,
    priority: 100000.0012,
    key: "coverart",
    style: {
        width: 240,
        height: 240,
        top: 10,
        image: "/dylan.png"
    }
}, {
    isId: true,
    priority: 100101.0011,
    key: "artist",
    style: {
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
        color: "black"
    }
}, {
    isId: true,
    priority: 100101.0014,
    key: "linernotes",
    style: {
        width: 240,
        height: 240,
        bottom: 10,
        font: {
            fontSize: 10,
            fontFamily: "serif"
        },
        color: "black",
        text: "Together Through Life is the 33rd studio album by Bob Dylan, released on April 28, 2009, on Columbia Records. The album debuted at number one in several countries, including the U.S. and the UK. It is Dylan's first number one in Britain since New Morning in 1970."
    }
} ];