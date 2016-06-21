console.log('script arrived and executing');

var TARGET = "http://cdn.rawgit.com";
var DEALZONE_HTML = "//cdn.rawgit.com/syoels/General/03b435e3e8f2b6c35d233338b4e050983df93d8f/test.html";

function initDealzone(){
	if($('.fn-dealzone-container').length > 0){
		return;
	}
	var $fn_container = 
		"<div class='fn-dealzone-container' style='display:none;'>" + 
			"<iframe id='dz-iframe' frameborder='0' src='" + DEALZONE_HTML + "'" + 
			"style= 'width: 100%; " + 
				"max-width: 100%;" + 
				"overflow: hidden;" + 
				"height: 100%;' " + 
			"></iframe>" + 
		"</div>";
	$('body').prepend($fn_container);
	setDealzoneContainrStyle();
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


function sendUrl(){
	var url = window.location.href;
	sendMsg(url);
}
function sendMsg(msg){
	var dz_iframe = document.getElementById('dz-iframe');
	if (!dz_iframe) { return; }
	dz_iframe.contentWindow.postMessage(msg, TARGET);
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

function setDealzoneContainrStyle(){
	var $fn_container = getDealzoneElement();
	$fn_container[0].style.cssText = "width: 100%; " + 
				"max-width: 100%;" + 
				"overflow: hidden;" + 
				"height: 100%;" + 
				"background: rgb(209,209,210);" + 
				"background: -moz-linear-gradient(top,  rgba(209,209,210,1) 0%, rgba(216,216,216,1) 100%);" + 
  				"background: -webkit-linear-gradient(top,  rgba(209,209,210,1) 0%,rgba(216,216,216,1) 100%);" + 
  				"background: linear-gradient(to bottom,  rgba(209,209,210,1) 0%,rgba(216,216,216,1) 100%);" + 
  				"filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d1d1d2', endColorstr='#d8d8d8',GradientType=0 );";
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
