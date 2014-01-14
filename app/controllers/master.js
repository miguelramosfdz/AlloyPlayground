var args = arguments[0] || {};

function doItemClick(e) {

	$.trigger('detail', e);
	
}

$.ilist.init({
	onItemClick : doItemClick,
});
