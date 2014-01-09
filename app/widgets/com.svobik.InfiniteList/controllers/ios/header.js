/**
 * Header options
 */
var options = {
	pullMsg : L('pvPullMessage', 'Pull to refresh'),
	pulledMsg : L('pvPulledMessage', 'Release to refresh'),
	loadingMsg : L('pvLoadingMessage', 'Loading new content...'),
	inProgress : false,
	onRefresh : null,
	isReady : false,
	element : null,
};

/**
 * Required plugins
 */
var moment = require('alloy/moment');

/**
 * Retrieves current formatted date
 */
function getFormattedDate() {
	return moment().format('DD/MM/YYYY HH:mm');
}

/**
 * Retrieves status message based on 'pulled' param
 */
function getMessage(pulled) {

	if (pulled) {
		return options.pulledMsg;
	}

	return options.pullMsg;
}

/**
 * Retrieves timestamp of last refresh
 */
function getTimestamp() {

	return String.format(L('pvTimestamp'), getFormattedDate());
}

/**
 * Handles ListView's pull down action
 */
function pullListener(e) {

	if (false === options.inProgress) {

		if (e.active == false) {
			var rotation = Ti.UI.create2DMatrix();
		} else {
			var rotation = Ti.UI.create2DMatrix().rotate(180);
		}

		$.hvImage.animate({
			transform : rotation,
			duration : 180
		});

		$.hvMessage.text = getMessage(e.active);
	}
}

/**
 * Handles ListView's pullend action
 */
function pullendListener() {

	if (false === options.inProgress) {

		options.inProgress = true;

		$.hvImage.hide();

		$.hvActivityIndicator.show();

		$.hvMessage.text = options.loadingMsg;

		options.element.setContentInsets({
			top : 65,
		}, {
			animated : true,
		});

		refresh();
	}
}

/**
 * Creates refresh view
 */
function createRefreshView() {

	$.hvMessage.text = getMessage();
	$.hvTimestamp.text = getTimestamp();

	return $.getView();
}

/**
 * Refreshes and loads new data
 */
function refresh() {
	try {

		options.onRefresh(reset);

	} catch(err) {

		alert('Loading error! ' + err);
		reset();

	}
}

/**
 * Resets to its default state
 */
function reset() {

	$.hvActivityIndicator.hide();

	$.hvImage.transform = Ti.UI.create2DMatrix();
	$.hvImage.show();

	$.hvMessage.text = getMessage(false);
	$.hvTimestamp.text = getTimestamp();

	options.element.setContentInsets({
		top : 0
	}, {
		animated : true
	});

	options.inProgress = false;
}

/**
 * Cancels event listeners so memory can be released
 */
function cancel() {

	if (true === options.isReady) {

		options.element.removeEventListener('pull');
		options.element.removeEventListener('pullend');

		options.isReady = false;
	}
}

/**
 * Inits header view
 */
function init(_options) {

	if (false === options.isReady) {

		_.extend(options, _options);

		if (false !== options.element) {

			options.element.addEventListener('pull', pullListener);
			options.element.addEventListener('pullend', pullendListener);

			options.element.setPullView(createRefreshView());

			options.isReady = true;
		}
	}
}

/**
 * Public functions
 */
exports.init = init;
exports.cancel = cancel;
