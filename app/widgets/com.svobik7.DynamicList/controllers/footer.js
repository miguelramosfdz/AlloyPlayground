/**
 * Footer options
 */
var options = {
	tapMsg : L('fvTapMessage', 'Tap to refresh'),
	doneMsg : L('fvDoneMessage', 'No more content'),
	markerPosition : 0,
	markerTreshold : 5,
	inProgress : false,
	isReady : false,
	element : null,
};

/**
 * Handles FooterView's tap event
 */
function tapListener() {

	loadNext();
}

/**
 * Handles ListView's marker event and fires tap on FooterView
 */
function markerListener() {

	loadNext();
}

/**
 * Load more data
 */
function loadNext() {

	if (false === options.inProgress) {

		options.inProgress = true;

		$.fvActivityIndicator.show();

		$.fvMessage.text = '';

		options.element.fireEvent('next', {
			success : success,
			error : error,
		});
	}
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
 * Detects and retrieves ListView's marker
 */
function detectMarker() {

	var marker = {}, sections = options.element.getSections(), items = sections[0].getItems();

	var markerPosition = Math.floor(items.length - options.markerTreshold);

	if (markerPosition > 0 && markerPosition > options.markerPosition) {

		marker.sectionIndex = 0;
		marker.itemIndex = markerPosition;

		options.markerPosition = markerPosition;
	}

	return marker;
}

/**
 * Creates footer view
 */
function createFooterView() {

	$.fvMessage.addEventListener('singletap', tapListener);

	$.fvMessage.text = options.tapMsg;

	return $.getView();
}

/**
 * Reset footer to its default state
 */
function reset(isDone) {

	$.fvActivityIndicator.hide();

	if (isDone) {
		$.fvMessage.text = options.doneMsg;
	} else {
		$.fvMessage.text = options.tapMsg;
		options.element.setMarker(detectMarker());
	}

	options.inProgress = false;
}

/**
 * Dettaches footer from element
 */
function dettach() {

	if (true === options.isReady) {

		$.fvMessage.removeEventListener('singletap', tapListener);

		options.element.removeEventListener('marker', markerListener);

		options.element.marker = null;

		options.element.footerView = null;

		options.isReady = false;
	}
}

/**
 * Attaches footer to element
 */
function attach() {

	if (false === options.isReady) {

		$.fvMessage.addEventListener('singletap', tapListener);

		options.element.addEventListener('marker', markerListener);

		options.element.setMarker(detectMarker());

		options.element.setFooterView(createFooterView());

		// Android workaround
		//var sections = options.element.getSections();
		//sections[0].setFooterView(createFooterView());

		options.isReady = true;

	}
}

/**
 * Cancels footer
 */
function cancel() {

	dettach();
}

/**
 * Inits footer
 */
function init(_element) {

	if (false === options.isReady) {

		_.extend(options, {
			element : _element
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
