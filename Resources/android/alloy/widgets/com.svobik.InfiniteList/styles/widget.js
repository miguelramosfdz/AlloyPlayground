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
    priority: 100000.0006,
    key: "pvActivityIndicator",
    style: {
        left: 35,
        bottom: 15,
        width: 30,
        height: 30
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "pvImage",
    style: {
        left: 35,
        bottom: 5,
        image: WPATH("images/arrow.png"),
        height: 60,
        width: 23
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "pvMessage",
    style: {
        color: "#fff",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        text: "Pull down to refresh...",
        textAlign: "center",
        bottom: 30
    }
}, {
    isId: true,
    priority: 100000.0009,
    key: "pvTimestamp",
    style: {
        color: "#fff",
        font: {
            fontSize: 11
        },
        textAlign: "center",
        bottom: 15
    }
}, {
    isId: true,
    priority: 100101.0005,
    key: "pvView",
    style: {
        backgroungColor: "red"
    }
} ];