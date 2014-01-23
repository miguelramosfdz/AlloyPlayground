function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik7.DynamicList/" + s : s.substring(0, index) + "/com.svobik7.DynamicList/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0012,
    key: "dlActivityIndicator",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    }
}, {
    isId: true,
    priority: 100101.0013,
    key: "dlActivityIndicator",
    style: {
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
    }
} ];