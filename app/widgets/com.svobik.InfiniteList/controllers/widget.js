var args = arguments[0] || {};

/**
 * Widget options
 */
var options = {
	onCreate : doCreateList,
	onRefresh : doRefresh,
	onLoadNext : doLoadNext,
};

/**
 * Creates default items
 */
function createItems() {
	// ListView items stack
	var items = [];

	var itemsCount = $.listSection.getItems().length;

	Ti.API.log('ItemsCount: ' + itemsCount);

	for (var i = itemsCount; i < itemsCount + 10; i++) {
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

	return items;
}

/**
 * Creates ListView
 */
function doCreateList() {

	var items = createItems();

	$.listSection.setItems(items);
}

/**
 * Default refresh
 */
function doRefresh(callback) {
	setTimeout(function() {
		alert('Refreshed');
		callback();
	}, 2500);
}

/**
 * Default load next
 */
function doLoadNext(callback) {
	setTimeout(function() {

		var items = createItems();
		
		$.listSection.appendItems(items);

		callback(!items.length);
	}, 2500);
}

/**
 * Inits widget
 */
function init() {

	options.onCreate();

	var headerController = Widget.createController('header');

	headerController.init({
		element : $.listView,
		onRefresh : options.onRefresh,
	});

	var footerController = Widget.createController('footer');

	footerController.init({
		element : $.listView,
		onLoadNext : options.onLoadNext,
	});
}

init();
