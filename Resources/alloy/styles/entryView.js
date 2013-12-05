module.exports = [ {
    isClass: true,
    priority: 10000.0005,
    key: "field",
    style: {
        width: "50dp",
        height: "40dp",
        left: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        borderRadius: 6,
        textAlign: "center"
    }
}, {
    isId: true,
    priority: 100000.0002,
    key: "eView",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 0,
        backgroundColor: "#fff"
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "wrapper",
    style: {
        layout: "horizontal",
        height: Ti.UI.SIZE,
        left: 20,
        right: 20,
        top: 50
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "lbl",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 20,
        right: 20,
        top: 10,
        color: "#000"
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "c",
    style: {
        editable: false
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "submit",
    style: {
        title: "Update",
        width: Ti.UI.SIZE,
        height: "40dp",
        left: 10
    }
} ];