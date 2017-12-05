var socket = io();

function clearValue(elementId) {
    console.log(`clearing value for ${elementId}`);
    // Selectors
    var element = jQuery(`#${elementId}`);
    
    console.log(element.text());
    element.val('');
}

socket.on('connect', function () {
    socket.emit('load-join', function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });

});
    
socket.on('updateRoomList', function(rooms) {

    var or = jQuery ('<label></label>').text('*OR*');
    var br = jQuery('<br/>');
    var label = jQuery('<label></label>').text('Choose Existing Room...');
    var select = jQuery('<select></select>').attr("name", "existingRoom").attr("id", "existingRoom").attr("onchange", "clearValue('newRoom');");
    
    select.append(jQuery('<option></option>').attr("value", "").text('Please select a room'));
    // select.append(jQuery('<option></option>').val("").text('Please select a room'));
    rooms.forEach(function(room) {
        select.append(jQuery('<option></option>').attr("value", room).text(room));
    });
    

    if (rooms) {
        jQuery('#room-selector').append(or);
        jQuery('#room-selector').append(br);
        jQuery('#room-selector').append(label);
        jQuery('#room-selector').append(select);
    }
});
