function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100100.0006,
    key: "headerView",
    style: {
        backgroundColor: "red"
    }
}, {
    isId: true,
    priority: 100100.0007,
    key: "hvActivityIndicator",
    style: {
        left: 35,
        bottom: 15,
        width: 30,
        height: 30
    }
}, {
    isId: true,
    priority: 100100.0008,
    key: "hvImage",
    style: {
        left: 35,
        bottom: 5,
        image: WPATH("images/arrow.png"),
        height: 60,
        width: 23
    }
}, {
    isId: true,
    priority: 100100.0009,
    key: "hvMessage",
    style: {
        color: "#f00",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        textAlign: "center",
        bottom: 30
    }
}, {
    isId: true,
    priority: 100100.001,
    key: "hvTimestamp",
    style: {
        color: "#f00",
        font: {
            fontSize: 11
        },
        textAlign: "center",
        bottom: 15
    }
} ];