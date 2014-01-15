/**
 * Widget options
 */
var options = {
	onInit : null,
	onRefresh : null,
	onLoadNext : null,
	onItemClick : null,
	header : null,
	footer : null,
};

/**
 * Creates default ListView
 */
function doInit(callback) {

	//Ti.API.log('Called "widget.doInit". ' + callback);

	options.onInit(function(items) {

		$.lvActivityIndicator.hide();

		$.listSection.setItems(items);
		
		$.listWrapper.show();

		callback();

	});
}

/**
 * Do default refresh
 */
function doRefresh(callback) {

	//Ti.API.log('Called "widget.doRefresh". ' + callback);

	options.onRefresh(function(items) {

		$.listSection.insertItemsAt(0, items);

		callback(!items.length);
	});
}

/**
 * Do Default load next
 */
function doLoadNext(callback) {

	//Ti.API.log('Called "widget.doloadNext". ' + callback);

	options.onLoadNext(function(items) {

		$.listSection.appendItems(items);

		callback(!items.length);
	});
}

/**
 * Handles item click as default
 */
function doItemClick(e) {

	options.onItemClick(e);
}

/**
 * Sets widget's options
 */
function setOptions(_options) {
	delete _options.__parentSymbol;
	delete _options.__itemTemplate;
	delete _options.$model;

	_.extend(options, _options);
}

/**
 * Destroys widget
 */
function destroy() {

	options.header.cancel();

	options.footer.cancel();

	options.header = options.footer = null;

	$.listView.removeEventListener('itemclick');
}

/**
 * Creates ListView
 */
function create() {

	$.listView.addEventListener('itemclick', doItemClick);

	options.header = Widget.createController('header');
	options.footer = Widget.createController('footer');

	options.header.init({
		element : $.listView,
	});

	options.footer.init({
		element : $.listView,
	});

	options.header.on('refresh', doRefresh);
	options.footer.on('loadNext', doLoadNext);
}

/**
 * Inits widget
 */
function init(_options) {

	$.listWrapper.hide();
	$.lvActivityIndicator.show();

	setOptions(_options);

	if (null === options.onInit || null === opitons.onRefresh || null === options.onLoadNext) {

		var loader = require(WPATH('loader'));

		options.onInit = (null === options.onInit) ? loader.init : options.onInit;
		options.onRefresh = (null === options.onRefresh) ? loader.refresh : options.onRefresh;
		options.onLoadNext = (null === options.onLoadNext) ? loader.loadNext : options.onLoadNext;
	}

	doInit(create);
}

/**
 * Public functions
 */
exports.init = init;
