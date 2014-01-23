var args = arguments[0] || {};

var library = Alloy.Collections.Book;

function doFilter() {
	alert('Filter');
}

function doInit(e) {

	library.reset([{
		"title" : "Lord Of The Rings",
		"subtitle" : "J.R.R. Tolkien",
	}, {
		"title" : "Hobit",
		"subtitle" : "J.R.R. Tolkien 2",
	}, {
		"title" : "Inferno",
		"subtitle" : "Dan Brown",
	}, {
		"title" : "Godfather",
		"subtitle" : "Mario Puzo",
	}, {
		"title" : "Last Don",
		"subtitle" : "Mario Puzo 2",
	}]);

	return e.success();

	//return e.error('Error message example.');
}

function doRefresh(e) {

	setTimeout(function() {

		var result = Math.random() * 10;

		if (result > 3) {

			var model = Alloy.createModel('book', {
				"title" : "Book#",
				"subtitle" : "Author Name#",

			});

			model.save();

			library.add(model, {
				at : 0
			});

			return e.success();
		}

		return e.error('Connection failed.');

	}, 2000);
}

function doNext(e) {

	setTimeout(function() {

		var result = Math.random() * 10;

		if (result > 3) {

			var model = Alloy.createModel('book', {
				"title" : "Book#",
				"author" : "Author Name#",

			});

			library.add(model);

			model.save();

			return e.success();
		}

		return e.error('Connection failed.');

	}, 2000);
}

function doItemClick(e) {
	$.trigger('detail', e);
}

$.dlist.init($.bookList);

// Left & Right SlideMenu
function lMenuTapListener(e) {

	Alloy.Globals.leftMenu.toggle(e);
}

function rMenuTapListener(e) {

	Alloy.Globals.rightMenu.toggle(e);
}

$.lMenuBtn.addEventListener('click', lMenuTapListener);
$.rMenuBtn.addEventListener('click', rMenuTapListener);

$.masterWin.setLeftNavButton($.lMenuBtn);
$.masterWin.setRightNavButton($.rMenuBtn);