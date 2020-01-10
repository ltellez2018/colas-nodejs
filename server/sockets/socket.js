//? *************************************************************
//? ***                   'R E Q U I E R E S'                 ***
//? *************************************************************

const { TicketControl } = require('../classes/ticket-control');
const { io } = require('../server');
const ticketControl = new TicketControl();


io.on('connection', (client) => {

    // ? E V E N T O S

    // * L I S T E N E R S
    client.on('nuevoTicket', (data, callback) => {
        let nuevoTicket = ticketControl.siguiente();
        console.log(nuevoTicket);
        callback(nuevoTicket);
    });

    // * E M I T E R S
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data,callback) =>{
        
        if( !data.escritorio ) {
            return callback({
								err: true,
								mensaje: 'Escritorio es necesario'
            });
				}
				
				let atenderTicket = ticketControl.atanderTicket(data.escritorio);

				callback(atenderTicket);	

                // * ACTUALIZAR PANTALLA PUBLICA                
                client.broadcast.emit('ultimos4',{ultimos4: ticketControl.getUltimos4()});
    });

});

