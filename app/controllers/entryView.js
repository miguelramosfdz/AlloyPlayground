var updateWebView = function() {
	$.a.blur();
	$.b.blur();

	Ti.App.fireEvent('updateGraph', {
		a : Math.floor(parseInt($.a.value)),
		b : Math.floor(parseInt($.b.value)),
		c : Math.floor(parseInt($.c.value))
	});
};

var calcC = function() {
	$.c.value = String(Math.round(100 - $.a.value - $.b.value));
};

$.submit.addEventListener('click', updateWebView);
$.a.addEventListener('change', calcC);
$.b.addEventListener('change', calcC);
