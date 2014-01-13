function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0002,
    key: "Label",
    style: {
        color: "#000",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "heading",
    style: {
        top: 5,
        font: {
            fontSize: 18,
            fontWeight: "bold"
        }
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "excerpt",
    style: {
        top: 35,
        font: {
            fontSize: 12
        }
    }
}, {
    isId: true,
    priority: 100101.0005,
    key: "pvView",
    style: {
        backgroundColor: "red"
    }
} ];