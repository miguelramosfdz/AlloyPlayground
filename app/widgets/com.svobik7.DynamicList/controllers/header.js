/**
 * Header options
 */
var options = {
	pullMsg : L('pvPullMessage', 'Pull to refresh'),
	pulledMsg : L('pvPulledMessage', 'Release to refresh'),
	loadingMsg : L('pvLoadingMessage', 'Loading new content...'),
	inProgress : false,
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
 * Handles element's pull down action
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
 * Refreshes and loads new data
 */
function refresh() {

	options.element.fireEvent('refresh', {
		success : success,
		error : error,
	});
}

/**
 * Successfull callback for refresh method
 */
function success(isDone) {

	reset(isDone);
}

/**
 * Fail callback for refresh method
 */
function error(msg) {

	alert(msg);
	reset(false);
}

/**
 * Creates header view
 */
function createHeaderView() {

	$.hvMessage.text = getMessage();
	$.hvTimestamp.text = getTimestamp();

	return $.getView();
}

/**
 * Resets header to its default state
 */
function reset(isDone) {

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
 * Detaches header from element
 */
function dettach() {

	if (true === options.isReady) {

		options.element.removeEventListener('pull', pullListener);
		options.element.removeEventListener('pullend', pullendListener);

		options.element.pullView = null;

		options.isReady = false;
	}

}

/**
 * Attaches header to element
 */
function attach() {

	if (false === options.isReady) {

		options.element.addEventListener('pull', pullListener);
		options.element.addEventListener('pullend', pullendListener);

		options.element.setPullView(createHeaderView());

		// Android workaround
		//var sections = options.element.getSections();
		//sections[0].setHeaderView(createheaderView());

		options.isReady = true;
	}

}

/**
 * Cancels header
 */
function cancel() {

	dettach();
}

/**
 * Inits header
 */
function init(_element) {

	if (false === options.isReady) {

		_.extend(options, {
			element : _element,
		});

		if (options.element) {

			attach();
		}
	}
}

/**
 * Public functions
 */
exports.init = init;
exports.cancel = cancel;
