var args = arguments[0] || {};

/**
 * Device's screen width
 */
var screenWidth = Ti.Platform.displayCaps.platformWidth;

var options = {
	id : null,
	element : null,
	position : null,
	duration : 200,
	width : 250,
	icelayer : null,
	animation : null,
	isAttached : false,
	isOpened : false,
};

/**
 * Sets widget's options
 */
function setOptions(_options) {

	_.extend(options, _options);

	if ('right' === options.position) {
		options.position = 1;
	} else {
		options.position = 0;
	}
}

/**
 * Creates slide animation based on given params
 */
function createAnimation(direction) {

	return Ti.UI.createAnimation({
		duration : options.duration,
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	});
}

/**
 * Retrieves propper animation based on 'position' and 'isOpened' option
 */
function getAnimation() {

	if (null === options.animation) {

		options.animation = createAnimation();
	}

	if (options.isOpened) {

		options.animation.left = 0;

	} else {

		options.animation.left = (options.position) ? -options.width : options.width;
	}

	return options.animation;
}

/**
 * After open listener
 */
function onOpenListener() {

	$.trigger('slidemenu:open');
}

/**
 * After close listener
 */
function onCloseListener() {

	$.smw.hide();

	$.trigger('slidemenu:close');
}

/**
 * Covers parent with icelayer
 */
function freezeParent(e) {

	if (e.source) {

		options.icelayer = Ti.UI.createView({
			height : Ti.UI.FILL,
			backgroundColor : 'blue',
			opacity : 0.5,
		});

		options.icelayer.addEventListener('click', close);

		e.source.getParent().add(options.icelayer);
	}
}

/**
 * Thaws parent's icelayer
 */
function thawParent(e) {

	options.icelayer.removeEventListener('click', close);

	options.icelayer.getParent().remove(options.icelayer);

	options.icelayer = null;
}

/**
 * Opens slide menu
 */
function open(e) {

	$.smw.show();

	options.element.applyProperties({
		width : screenWidth
	});

	freezeParent(e);

	options.element.animate(getAnimation(), onOpenListener);

	options.isOpened = true;
}

/**
 * Closes slide menu
 */
function close(e) {

	thawParent(e);

	options.element.animate(getAnimation(), onCloseListener);

	options.isOpened = false;
}

/**
 * Toggles slide menu
 */
function toggle(e) {

	if (options.isOpened) {
		close(e);
	} else {
		open(e);
	}
}

/**
 * Creates slide menu view
 */
function createView(callback) {

	var properties = {
		width : options.width,
	};

	if (options.position) {
		properties.right = 0;
	} else {
		properties.left = 0;
	}

	$.smw.applyProperties(properties);

	$.smw.open();

	callback();
}

/**
 * Attaches slide menu
 */
function attach() {

	options.isAttached = true;
}

/**
 * Dettaches slide menu
 */
function dettach() {

	options.element = null;
	options.isAttached = false;
}

/**
 * Cancels slide menu
 */
function cancel() {

	if (options.element && true === options.isAttached) {

		dettach();
	}
}

/**
 * Inits slide menu
 */
function init(_options) {

	if (args) {
		_.extend(_options, args);
	}

	setOptions(_options);

	if (options.element && false === options.isAttached) {

		createView(attach);

		Alloy.Globals[options.id] = $;
	}
}

/**
 * Public functions
 */
exports.init = init;
exports.cancel = cancel;
exports.open = open;
exports.close = close;
exports.toggle = toggle;
