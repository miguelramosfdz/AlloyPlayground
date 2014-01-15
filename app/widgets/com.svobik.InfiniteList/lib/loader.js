var itemsCount = 0;
/**
 * Creates default items
 */
function createItems(_limit) {
	// ListView items stack
	var items = [];

	Ti.API.log('ItemsCount: ' + itemsCount);

	for (var i = itemsCount; i < itemsCount + _limit; i++) {
		var item = {
			heading : {
				text : 'Heading ' + i
			},
			excerpt : {
				text : 'This is short excerpt #' + i
			},
		};

		items.push(item);
	};

	itemsCount += items.length;

	return items;
}

/**
 * Creates default ListView
 */
function init(callback) {

	Ti.API.log('Called "doInit". ' + callback);

	// simulates internet connection delay
	setTimeout(function() {

		var items = createItems(20);
		callback(items);

	}, 5000);

}

/**
 * Do default refresh
 */
function refresh(callback) {

	Ti.API.log('Called "doRefresh". ' + callback);

	// simulates internet connection delay
	setTimeout(function() {

		var items = createItems(10);
		callback(items);

	}, 2500);
}

/**
 * Do Default load next
 */
function loadNext(callback) {

	Ti.API.log('Called "loadNext". ' + callback);

	// simulates internet connection delay
	setTimeout(function() {

		var items = createItems(10);
		callback(items);

	}, 2500);
}

/**
 * Handles item click as default
 */
function itemClick(e) {
	alert('You clicked me! #' + e.itemIndex);
}

/**
 * Public funcitons
 */
exports.init = init;
exports.refresh = refresh;
exports.loadNext = loadNext;
exports.itemClick = itemClick;
