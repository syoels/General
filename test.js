console.log('script arrived and executed');


//TODO: assert jquery present
function initDealzone(){
	var $fn_container = 
		"<div class='fn-dealzone-container' style='display:none;'>" + 
			"<iframe src='https://cdn.rawgit.com/syoels/General/master/test.html'></iframe>" + 
		"</div>";
	$('body').prepend($fn_container);
}

function getDealzoneElement(){
	// assert dealzone element on DOM.
	if($('.fn-dealzone-container').length === 0){
		initDealzone();
	}
	return $fn_container = $('.fn-dealzone-container').first();
}

function showDealzone(){
	var $fn_container = getDealzoneElement();
	$('body').css({
		'width': '80%', 
		'float': 'right'
	});
	$fn_container.css({
		'position': 'fixed',
		'z-index': '999999999',
		'width': '18%', 
		'float': 'left', 
		'margin-left': '-20%;',
		'max-width': '18%', 
		'overflow': 'hidden', 
		'background': '#3f91c6'
	});
	keepHeight();
	$fn_container.fadeIn();
}

function keepHeight(){
	var $fn_container = getDealzoneElement();
	var h = $(window).height();
	$fn_container.height(h);
	$(window).resize(function(){
		var h = $(window).height();
		$fn_container.height(h);
	});
}

