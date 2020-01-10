//? *************************************************************
//? ***                   'R E Q U I E R E S'                 ***
//? *************************************************************

const fs = require('fs');


// *************************************************************
// ***                  'CONTROL DE TICKETS'                 ***
// *************************************************************

class Ticket {
	constructor(numero , escritorio) {
		this.numero = numero;
		this.escritorio = escritorio;
	}

}


class TicketControl {

	constructor() {
		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.tickets = []; // * PENDIENTES POR  ATENDER
		this.ultimos4 = [];
		let data = require('../data/data.json');

		if (data.hoy === this.hoy) {
			this.ultimo = data.ultimo;
			this.tickets = data.tickets;
			this.ultimos4 = data.ultimos4;
		} else {
			this.reiniciarConteo();
		}
	}

	siguiente() {
		this.ultimo += 1;
		let ticket = new Ticket(this.ultimo,null);
		this.tickets.push(ticket);	
		this.grabarArchivo();		
		return `Ticket 	${this.ultimo}`;
	}

	getUltimoTicket() {
		return `Ticket 	${this.ultimo}`; 
	}
	
	getUltimos4() {
		return this.ultimos4;
	}

	atanderTicket( escritorio ) {
		if( this.tickets.length === 0 ) {
			return 'No hay tickets'
		}
		let numeroTicket = this.tickets[0].numero;
		this.tickets.shift(); // * ELIMINA EL PRIMERO
		let atenderTicket = new Ticket(numeroTicket,escritorio);
		this.ultimos4.unshift(atenderTicket); // * AGREGA AL INICIO

		if(this.ultimos4.length > 4){
			this.ultimos4.splice(-1,1); // * BORRA EL ULTIMO
		}
		console.log('Ultimos 4: ' , this.ultimos4);

		this.grabarArchivo();

		return atenderTicket;
		
	}

	reiniciarConteo() {
		this.ultimo = 0;	
		this.tickets= [];
		this.ultimos4 = [];
		console.log('Se ha inicializado el sistema');
		this.grabarArchivo();		
	}

	// * G R A B A R  A R C H I V O

	grabarArchivo() {
		// * G E N E R A N D O   O B J E T O   J S O N
		let jsonData = {
			ultimo: this.ultimo,
			hoy: this.hoy,
			tickets: this.tickets,
			ultimos4: this.ultimos4
		};

		// * O  B J E T O   T O   J S O N  S T R I N G
		let jsonDataString = JSON.stringify(jsonData);

		// * G R A B A N D O   E N   E L   A R C H I V O
		fs.writeFileSync('./server/data/data.json', jsonDataString);
	}



}



// * E X P O R T A C I O N
module.exports = {
	TicketControl
};