function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100100.0008,
    key: "footerView",
    style: {
        backgroundColor: "transparent"
    }
}, {
    isId: true,
    priority: 100100.0009,
    key: "fvActivityIndicator",
    style: {
        width: 30,
        height: 30
    }
}, {
    isId: true,
    priority: 100100.0012,
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
    priority: 100201.001,
    key: "fvActivityIndicator",
    style: {
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
    }
} ];