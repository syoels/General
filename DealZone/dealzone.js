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

