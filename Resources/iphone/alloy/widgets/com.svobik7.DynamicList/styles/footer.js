function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik7.DynamicList/" + s : s.substring(0, index) + "/com.svobik7.DynamicList/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0002,
    key: "footerView",
    style: {
        backgroundColor: "transparent"
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "fvActivityIndicator",
    style: {
        width: 30,
        height: 30
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "fvMessage",
    style: {
        color: "#000",
        font: {
            fontSize: 12
        },
        textAlign: "center"
    }
}, {
    isId: true,
    priority: 100101.0004,
    key: "fvActivityIndicator",
    style: {
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
    }
} ];