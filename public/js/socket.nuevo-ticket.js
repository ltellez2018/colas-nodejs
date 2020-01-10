// *************************************************************
// ***           'CONEXION CON EL SERVER'         ***
// *************************************************************

var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('*** Cliente conectado ***');
});

socket.on('disconnect', function () {
    console.log('*** Cliente desconectado ***');
});

socket.on('estadoActual', function (data) {    
    label.text(data.actual);
});

// *************************************************************
// ***           'G E N E R A N D O  T I C K E T'            ***
// *************************************************************
$('button').on('click', function () {
    console.log('*** Enviando generacion de nuevo ticket ***');
    socket.emit('nuevoTicket', null, function(siguienteTicket){
        label.text(siguienteTicket);
    });
});
