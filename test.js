//TODO: move to normal hosting
var TARGET = "http://cdn.rawgit.com";
var DEALZONE_HTML = "//cdn.rawgit.com/syoels/General/60771b94419f5c89655fdcbb7c73a5d7caa59149/test.html";

//TODO: after demo delete demo related code
/*===========================
 Demo Specific (delete later)
============================*/
function sendDemoData(origin){
	if (typeof BehindAuto == 'object'){
		var demoData = {type: 'carDetails', data: {}};
		demoData.data.price = BehindAuto.InternetPrice;
		demoData.data.year = BehindAuto.YearName;
		demoData.data.model = BehindAuto.Model;
		demoData.data.make = BehindAuto.Make;
		demoData.data.name = BehindAuto.TrimName;
	}
	var o = origin ? origin : TARGET;
	console.log("sending demo data from " + o);
	sendMsg(demoData, o);
}

/*===========================
	Init
============================*/
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
	var $fn_container = $('.fn-dealzone-container').first();
	return $fn_container;
}

/*===========================
	Communication
============================*/
function sendMsg(msg, o){
	var origin = o ? o : TARGET;
	var dz_iframe = document.getElementById('dz-iframe');
	if (!dz_iframe) { return; }
	dz_iframe.contentWindow.postMessage(msg, origin);
}

// Create IE + others compatible event handler
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
  console.log('parent received message!:  ',e.data);
  if(e.data.type){
  	switch (e.data.type){
  		case 'call':
  			$('<a href="tel:' + e.data.data + '" target="_blank"></a>').click();
  			break;
  		case 'navigate':
  			$('<a href="https://www.google.com/maps/dir/Current+Location/"'+ e.data.data + 'target="_blank"></a>').click();
  			break;
  		default:
  			console.log('no handler yet for ' + e.data.type);
  	}
  }
},false);

/*===========================
	Appearance
===========================*/
function showDealzone(){
	var $fn_container = getDealzoneElement();
	$('body').css({
		'float': 'right',
		'width': '100%'
	});
	$fn_container.css({
		'position': 'fixed',
		'z-index': '999999999',
		'width': '0%', 
		'float': 'left', 
		'margin-left': '-20%',
		'max-width': '0%', 
		'overflow': 'hidden',
		'min-width': '0px',
	});
	setTimeout(function(){
		
		//TODO: delete this after demo
		sendDemoData();
		
		//enter screen
		$fn_container.fadeIn();
		$('body').animate({'width': '80%'}, 1000);
		$fn_container.animate({'width': '18%', 'max-width': '18%', 'min-width': '180px'}, 1000, function(){
			keepHeight();
			keepWidth();
		});
		
	}, 1000);

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



/*===========================
	    Utils
===========================*/
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
    	
    	showDealzone();
    	
    });
})();
