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
