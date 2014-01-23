function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.svobik7.SlideMenu/" + s : s.substring(0, index) + "/com.svobik7.SlideMenu/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0015,
    key: "slideMenuContainer",
    style: {
        top: 0,
        zIndex: 1,
        visible: false,
        height: Ti.UI.FILL,
        backgroundColor: "#6f6f6f"
    }
} ];