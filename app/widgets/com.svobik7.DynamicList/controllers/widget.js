var args = arguments[0] || {};

/**
 * Widget options
 */
var options = {
	list : null,
	header : null,
	footer : null,
	isReady : false,
};

/**
 * Sets widget's options
 */
function setOptions(_options) {

	_.extend(options, _options);
}

/**
 * Shows error occured during init
 */
function error(msg) {

	alert(msg);
}

/**
 * Dettaches widget to ListView
 */
function dettach() {

	if (true === options.isReady) {

		options.header.cancel();
		options.footer.cancel();

		options.header = options.footer = null;
	}
}

/**
 * Attaches widget to ListView
 */
function attach() {

	if (false === options.isReady) {

		options.header = Widget.createController('header');
		options.footer = Widget.createController('footer');

		options.header.init(options.list);
		options.footer.init(options.list);

		options.isReady = true;
	}
}

/**
 * Inits widget
 */
function init(_list) {

	if (!_list) {
		return false;
	}

	setOptions({
		list : _list
	});

	options.list.fireEvent('init', {
		success : attach,
		error : error,
	});
}

/**
 * Public functions
 */
exports.init = init;
