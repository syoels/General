//TODO: move to normal hosting
var TAG = "d8b2f044ad05ffb571be115117f97780a06e75c4"; //"Branch_v1.9";
var TARGET = "http://cdn.rawgit.com";
var DZ_ORIGIN = "http://cdn.rawgit.com";
var DEALZONE_HTML = "http://cdn.rawgit.com/syoels/General/" + TAG + "/DealZone/dealzone.html";
var DZ_CSS = "http://cdn.rawgit.com/syoels/General/" + TAG + "/DealZone/dealzoneParent.css";
var MS_TO_SHOW = 2000;

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
        "<iframe id='dz-iframe' frameborder='0' src='" + DEALZONE_HTML + "'></iframe>" +
        "</div>";
    $('body').prepend($fn_container);
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
    if(e.origin !== DZ_ORIGIN){
        return;
    }
    if(e.data.type){
        console.log('request for ' + e.data.type + ' to: ' + e.data.data);
        switch (e.data.type){
            case 'call':
                var id = $('.dz-call-btn').length;
                $('<a class="dz-call-btn" id="dz-call-'+ id +'" href="tel:' + e.data.data + '" target="_blank" style="display:none;"></a>').appendTo('body');
                document.getElementById('dz-call-'+ id).click();
                break;
            case 'navigate':
                var id = $('.dz-nav-btn').length;
                $('<a class="dz-nav-btn" id="dz-nav-' + id + '" href="https://www.google.com/maps/dir/Current+Location/'+ e.data.data + '" target="_blank" style="display:none;"></a>').appendTo('body');
                document.getElementById('dz-nav-'+ id).click();
                break;
            case 'maximize':
                console.log("maximizing!");
                maximizeDealzone();
                break;
            case 'minimize':
                console.log("minimizing!");
                minimizeDealzone();
                break;
            default:
                console.log('no handler yet for ' + e.data.type);
        }
    }
},false);

/*===========================
 Appearance
 ===========================*/
function loadDzCss(){
    $.get(DZ_CSS, null, function(result) {
        $("body").prepend("<style>" + result + "</style>");
    },'html');
}
function showDealzone(){
    var $fn_container = getDealzoneElement();
    $('body').css({
        'float': 'right',
        'width': '100%'
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

    }, MS_TO_SHOW);
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
function minimizeDealzone(){
    sessionStorage["dealzone-minimized"] = true;

    $('body').animate({'width': '90%'}, 1000);
    $fn_container.animate({'width': '8%', 'max-width': '8%', 'min-width': '120px'}, 1000, function(){
        keepHeight();
        keepWidth();
    });
}
function maximizeDealzone(){
    sessionStorage["dealzone-minimized"] = false;

    $('body').animate({'width': '80%'}, 1000);
    $fn_container.animate({'width': '18%', 'max-width': '18%', 'min-width': '180px'}, 1000, function(){
        keepHeight();
        keepWidth();
    });
}


/*===========================
 Messages
 ============================*/
function initMessages(){
    var contHTML = '<div id="dz-msg-container"></div>'
    $('body').prepend(contHTML);
}
function addMsg(head, body, liveTime, delay){
    var id = $('.dz-msg').length;
    console.log('addMsg. id is: ' + id);
    var msgHtml = '<div class="dz-msg" id="dz-msg-'+ id + '" style="display:none;">' +
        '<div class="dz-msg-x">x</div>' +
        '<div class="dz-msg-head">' + head + '</div>' +
        '<div class="dz-msg-body">' + body + '</div>' +
        '</div>';
    $(msgHtml).appendTo('#dz-msg-container');
    var containers = $('#dz-msg-container').length;
    console.log('containers found: ' + containers);

    // Appear
    var delay_ms = delay ? delay : 0;
    var live_ms = liveTime ? liveTime : 6000;

    function createMsgAppearance(id, live_ms){
        var msgAppearance = function(){
            console.log('fading in id: ' + id);
            $('#dz-msg-' + id).fadeIn();
            $('#dz-msg-' + id).delay(live_ms).fadeOut();
        }
        return msgAppearance;
    }
    setTimeout(createMsgAppearance(id, live_ms), delay_ms);
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
        loadDzCss();
        initMessages();
        showDealzone();
        addMsg("Someone viewed this car", "5 minutes ago", 12000, 8000);
        addMsg("Someone just placed a hold on this car", "", 12000, 19000);

    });
})();
