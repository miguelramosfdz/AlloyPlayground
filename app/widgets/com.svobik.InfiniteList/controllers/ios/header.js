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

		$.rfImage.animate({
			transform : rotation,
			duration : 180
		});

		$.rfMessage.text = getMessage(e.active);
	}
}

/**
 * Handles ListView's pullend action
 */
function pullendListener() {

	if (false === options.inProgress) {

		options.inProgress = true;

		$.rfImage.hide();

		$.rfActivityIndicator.show();

		$.rfMessage.text = options.loadingMsg;

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

	$.rfMessage.text = getMessage();
	$.rfTimestamp.text = getTimestamp();

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

	$.rfActivityIndicator.hide();

	$.rfImage.transform = Ti.UI.create2DMatrix();
	$.rfImage.show();

	$.rfMessage.text = getMessage(false);
	$.rfTimestamp.text = getTimestamp();

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
 * Inits refresh view
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
