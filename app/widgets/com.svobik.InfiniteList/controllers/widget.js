var args = arguments[0] || {};

/**
 * Widget options
 */
var options = {
	onRefresh : doRefresh,
	onLoadNext : doLoadNext,
};

/**
 * Default load next
 */
function doLoadNext(callback) {
	setTimeout(function() {
		// ListView items stack
		var items = [];

		for (var i = 0; i < _data; i++) {
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

		// Sets list section items
		$.listSection.addItems(items);

		callback();
	}, 2500);
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
 * Creates ListView
 */
function createListView(_data) {

	// ListView items stack
	var items = [];

	for (var i = 0; i < _data; i++) {
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

	// Sets list section items
	$.listSection.setItems(items);
}

/**
 * Inits widget
 */
function init() {

	var headerController = Widget.createController('header');

	headerController.init({
		element : $.listView,
		onRefresh : options.onRefresh,
	});

	createListView(20);

	var footerController = Widget.createController('footer');

	footerController.init({
		element : $.listView,
		onLoadNext : options.onLoadNext,
	});
}

init();
