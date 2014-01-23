function init(id) {
	$.message.text = 'This is detail #' + id;
}

exports.init = init;

// Left & Right SlideMenu
function rMenuTapListener(e) {

	Alloy.Globals.rightMenu.toggle(e);
}

$.rMenuBtn.addEventListener('click', rMenuTapListener);

$.detailWin.setRightNavButton($.rMenuBtn);
