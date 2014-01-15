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

	if (false === options.inProgress) {

		options.inProgress = true;

		$.fvActivityIndicator.show();

		$.fvMessage.text = '';

		loadNext();
	}
}

/**
 * Handles ListView's marker event and fires tap on FooterView
 */
function markerListener() {

	$.fvMessage.fireEvent('singletap');
}

/**
 * Creates footer view
 */
function createFooterView() {

	$.fvMessage.text = options.tapMsg;

	return $.getView();
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
 * Load more data
 */
function loadNext() {

	$.trigger('loadNext', reset);
}

/**
 * Reset footer to it's default state
 */
function reset(isDone) {

	//Ti.API.log('Called footer "reset". ' + isDone);

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
 * Dettaches FooterView from element
 */
function dettach() {

	$.fvMessage.removeEventListener('singletap');

	options.element.removeEventListener('marker');

	options.element.marker = null;

	options.element.footerView = null;

	options.isReady = false;
}

/**
 * Attaches FooterView to element
 */
function attach() {

	$.fvMessage.addEventListener('singletap', tapListener);

	options.element.addEventListener('marker', markerListener);

	options.element.setMarker(detectMarker());

	options.element.setFooterView(createFooterView());

	options.isReady = true;
}

/**
 * Cancels footer view initialization
 */
function cancel() {

	if (true === options.isReady) {

		dettach();
	}
}

/**
 * Inits refresh view
 */
function init(_options) {

	if (false === options.isReady) {

		_.extend(options, _options);

		if (false !== options.element) {

			attach();
		}
	}
}

/**
 * Public functions
 */
exports.init = init;
exports.cancel = cancel;
