function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "InfiniteList/" + s : s.substring(0, index) + "/InfiniteList/" + s.substring(index + 1);
    return path;
}

module.exports = [];