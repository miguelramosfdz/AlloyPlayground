function openDetail(e) {

	// get the detail controller and window references
	var controller = OS_IOS && Alloy.isTablet ? $.detail : Alloy.createController('detail');
	var win = controller.getView();

	// init detail
	controller.init(e.itemIndex);

	// open the detail windows
	if (OS_IOS && Alloy.isHandheld) {
		Alloy.Globals.navgroup.openWindow(win);
	} else if (OS_ANDROID) {
		win.open();
	}
}

$.master.on('detail', openDetail);

if (OS_IOS && Alloy.isHandheld) {
	Alloy.Globals.navgroup = $.index;
}

if (OS_ANDROID) {

	$.master.getView().open();

} else {

	$.leftMenu.init({
		element : $.index,
	});

	$.rightMenu.init({
		element : $.index,
	});

	$.leftMenu.on('slidemenu:open', function() {
		alert('Left menu is open');
	});

	$.leftMenu.on('slidemenu:close', function() {
		alert('Left menu is closed');
	});

	$.index.open();
}