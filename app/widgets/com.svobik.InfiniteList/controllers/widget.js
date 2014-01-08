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
function doLoadNext() {
	alert('Loaded');
	return true;
}

/**
 * Default refresh
 */
function doRefresh() {
	
	alert('Refreshed');
	return true;
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

	var refreshController = Widget.createController('refresh');

	refreshController.init({
		element : $.listView,
		onRefresh : options.onRefresh,
	});

	createListView(20);
}

init();
