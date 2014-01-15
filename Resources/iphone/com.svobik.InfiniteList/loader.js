function createItems(_limit) {
    var items = [];
    Ti.API.log("ItemsCount: " + itemsCount);
    for (var i = itemsCount; itemsCount + _limit > i; i++) {
        var item = {
            heading: {
                text: "Heading " + i
            },
            excerpt: {
                text: "This is short excerpt #" + i
            }
        };
        items.push(item);
    }
    itemsCount += items.length;
    return items;
}

function init(callback) {
    Ti.API.log('Called "doInit". ' + callback);
    setTimeout(function() {
        var items = createItems(20);
        callback(items);
    }, 5e3);
}

function refresh(callback) {
    Ti.API.log('Called "doRefresh". ' + callback);
    setTimeout(function() {
        var items = createItems(10);
        callback(items);
    }, 2500);
}

function loadNext(callback) {
    Ti.API.log('Called "loadNext". ' + callback);
    setTimeout(function() {
        var items = createItems(10);
        callback(items);
    }, 2500);
}

function itemClick(e) {
    alert("You clicked me! #" + e.itemIndex);
}

var itemsCount = 0;

exports.init = init;

exports.refresh = refresh;

exports.loadNext = loadNext;

exports.itemClick = itemClick;