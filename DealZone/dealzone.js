$ = jQuery;//TODO: make sure this is needed, otherwise delete this line




/*===========================
 Demo & test functions
 ============================*/
function writeMsg(txt){
    $('.msg-window').text(txt);
}
writeMsg('Dealzone is running. messages here.');
function handleDemoData(e){
    if(e.data.type && e.data.type == 'carDetails'){
        var carTitle = e.data.data.year + " " + e.data.data.model + " " + e.data.data.make; // + " " + e.data.data.name;
        $('#dz-car-title').text(carTitle);
        $('.dz-old-price').text('$' + numeral(e.data.data.price * 1.05).format('0,0'));
        $('.dz-new-price').text('$' + numeral(e.data.data.price).format('0,0'));
    }
}
window.addEventListener("message", handleDemoData, false);



/*===========================
 Communication
 ============================*/
window.addEventListener("message", receiveMessage, false);
function receiveMessage(event) {

    //TODO: delete following lines after demo
    var data = (typeof event.data === 'string') ? '"' + event.data + '"' : 'data';
    var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
    writeMsg('Got ' + data + ' from "' + origin +'"');
    ///////////////////////////////////////////////////////


    if(event.data.type){
        switch(event.data.type){
            case "init":
                if(event.data.data == "maximized"){
                    $('.dz-maximized').fadeIn();
                    $items = $('.dz-item');
                    for(var i = 0; i < $items.length; i++){
                        function enter(i){
                            return function(){
                                setTimeout(function(){
                                    console.log("adding 'in' to current item.");
                                    $($items[i]).addClass("in");
                                }, 1200 + i * 300);
                            }
                        }
                        enter(i)();
                    }
                }
                if(event.data.data == "minimized"){
                    $('.dz-minified').fadeIn();
                }
                break;
            default:
                break;
        }
    }



}
function messageParent(msg){
    window.parent.postMessage(msg, '*');
}

function setupButtons() {
    $('#dz-btn-drive').click(function () {
        var msg = {type: 'navigate', data: '175 Broadway Ave, Bedford, OH'}
        messageParent(msg);
    });
    $('#dz-btn-call').click(function () {
        var msg = {type: 'call', data: '8558777009'}
        messageParent(msg);
    });
    $('#dz-minimize').click(function () {
        minimizeDealzone();
    });
    $('#dz-maximize').click(function () {
        maximizeDealzone();
    });
}
$(document).ready(function() {
    setupButtons();
});

/*===========================
 Appearance
 ============================*/
function minimizeDealzone(){
    var fadeOutSelector = ".dz-item > *";
    $(fadeOutSelector).addClass("fade-out").fadeOut(400, function(){
        messageParent({type: 'minimize'});
        $('.dz-minified').fadeIn();
        $('.dz-maximized').fadeOut();
    });

}
function maximizeDealzone(){
    messageParent({type: 'maximize'});
    $('.dz-minified').fadeOut();
    $('.dz-maximized').fadeIn(400, function(){
        var fadeInSelector = ".fade-out";
        $(fadeInSelector).removeClass("fade-out").fadeIn();
    });
}

function insertItem(idx, innerHTML){

    var id = $('.dz-item').length;
    var $item = $('<div class="dz-item dz-shade dz-bg-light" id="dz-item-' + id + '" >' + innerHTML + '</div>');

    var insertAfter = $('.dz-item').get(idx);
    if(insertAfter == undefined){
        $item.appendTo('.dz-body').addClass("in");
        return;
    } else {
        $item.insertAfter(insertAfter).addClass("in");
    }
  }

function dzInsert(item_name){
    switch(item_name){
        case "ctas":
            var newItemHTML = '<div class="dz-vertical-center">' +
                '<button class="dz-btn dz-pink hoverable" id="dz-btn-drive">TEST DRIVE</button>' +
                '<button class="dz-btn dz-teal hoverable" id="dz-btn-call">CALL</button>' +
                '</div>';
            insertItem(2, newItemHTML);
            break;
        case "heat":
            break;
        case "car":
            break;
        case "others":
            break;
        default:
            break;
    }
}
