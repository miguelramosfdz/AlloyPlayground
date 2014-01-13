function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik.InfiniteList/" + s : s.substring(0, index) + "/com.svobik.InfiniteList/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100100.0008,
    key: "headerView",
    style: {
        backgroundColor: "red"
    }
}, {
    isId: true,
    priority: 100100.0009,
    key: "hvActivityIndicator",
    style: {
        left: 35,
        bottom: 15,
        width: 30,
        height: 30
    }
}, {
    isId: true,
    priority: 100100.001,
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
    priority: 100100.0011,
    key: "hvMessage",
    style: {
        color: "#fff",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        textAlign: "center",
        bottom: 30
    }
}, {
    isId: true,
    priority: 100100.0012,
    key: "hvTimestamp",
    style: {
        color: "#fff",
        font: {
            fontSize: 11
        },
        textAlign: "center",
        bottom: 15
    }
} ];