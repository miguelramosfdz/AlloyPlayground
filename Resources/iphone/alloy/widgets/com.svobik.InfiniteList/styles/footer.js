function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100100.0005,
    key: "footerView",
    style: {
        backgroundColor: "#f00"
    }
}, {
    isId: true,
    priority: 100100.0006,
    key: "fvActivityIndicator",
    style: {
        width: 30,
        height: 30
    }
}, {
    isId: true,
    priority: 100100.0007,
    key: "fvMessage",
    style: {
        color: "#000",
        font: {
            fontSize: 12
        },
        textAlign: "center"
    }
} ];