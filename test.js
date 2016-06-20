console.log('script arrived and executing');

function initDealzone(){
	var $fn_container = 
		"<div class='fn-dealzone-container' style='display:none;'>" + 
			"<iframe id='dz-iframe' src='//cdn.rawgit.com/syoels/General/fdb26bd35a87232bdcae1238b66f053f1630ceb2/test.html'></iframe>" + 
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
/*===========================
		Communication
============================*/
var TARGET = "http://cdn.rawgit.com";
function sendUrl(){
	var url = window.location.href;
	sendMsg(url);
}
function sendMsg(msg){
	var url = window.location.href;
	window.postMessage(msg, TARGET);
}


/*===========================
		Appearance
===========================*/
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
		'margin-left': '-20%',
		'max-width': '18%', 
		'overflow': 'hidden',
		'min-width': '180px',
		'background': '#3f91c6'
	});
	keepHeight();
	keepWidth();
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
function keepWidth(){
	var $fn_container = getDealzoneElement();
	var min_width = $fn_container.css('min-width');
	min_width = parseInt(min_width.substring(0,min_width.indexOf('px')));
	var w = $(window).width();
	var body_max_width = (w - min_width) + "px";
	$('body').css({'max-width': body_max_width});
	$(window).resize(function(){
		var $fn_container = getDealzoneElement();
		var min_width = $fn_container.css('min-width');
		min_width = parseInt(min_width.substring(0,min_width.indexOf('px')));
		var w = $(window).width();
		var body_max_width = (w - min_width) + "px";
		$('body').css({'max-width': body_max_width});
		
		//fix left margin
		var width_outside_body = w - $('body').width();
		$fn_container.css({'margin-left': -width_outside_body + 'px'});
	});
}






// Get jQuery
(function () {

    function loadScript(url, callback) {

        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    loadScript("https://code.jquery.com/jquery-3.0.0.min.js", function () {
         //jQuery loaded
         console.log('jquery loaded');
    });
})();
