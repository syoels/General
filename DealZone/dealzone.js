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
    var data = (typeof event.data === 'string') ? '"' + event.data + '"' : 'data';
    var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
    writeMsg('Got ' + data + ' from "' + origin +'"');
}
function messageParent(msg){
    window.parent.postMessage(msg, '*');
}
$('#dz-btn-drive').click(function(){
    var msg = {type: 'navigate', data: '175 Broadway Ave, Bedford, OH'}
    messageParent(msg);
});
$('#dz-btn-call').click(function(){
    var msg = {type: 'call', data: '8558777009'}
    messageParent(msg);
});
$('#dz-minimize').click(function(){
    minimizeDealzone();
});
$('#dz-maximize').click(function(){
    maximizeDealzone();
});


/*===========================
 Appearance
 ============================*/
function minimizeDealzone(){
    messageParent({type: 'minimize'});
    $('.dz-minified').fadeIn();
    $('.dz-maximized').fadeOut();
}
function maximizeDealzone(){
    messageParent({type: 'maximize'});
    $('.dz-minified').fadeOut();
    $('.dz-maximized').fadeIn();
}

function insertItem(idx, innerHTML){

    var id = $('.dz-item').length;
    var $item = $('<div class="dz-item dz-shade dz-bg-light" id="dz-item-' + id + '" >' + innerHTML + '</div>');
    $item.css({
        'min-height': '0px',
        'max-height': '0px',
        'overflow': 'hidden',
        'padding': '0px',
        'max-width': '0px',
    });
    $item.children().hide();


    var insertAfter = $('.dz-item').get(idx);
    if(insertAfter == undefined){
        $item.appendTo('.dz-body');
        return;
    } else {
        $item.insertAfter(insertAfter);
    }

    $item.animate({ //height
        'min-height': '70px',
        'max-height': '200px'
    }, 400, function(){
        $item.animate({ //width
            'padding': '5px',
            'max-width': '400px',
        }, 600, function(){
            $item.children().fadeIn();
        });
    });
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
