const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();


const socketController = (socket) => {
        socket.on('next-ticket',(payload, callback)=>{
            const next = ticketControl.next();
            callback(next);
        });

        socket.on('get-last-ticket',(payload, callback)=>{
            const ticketData = ticketControl.toJson.last;
            callback(ticketData);
        })
        
        socket.on('new-ticket',(payload,callback)=>{
            const {desktop} = payload;
            //validation
            if(!desktop){
                return callback({
                    ok: false,
                    message: 'sin escritorio'
                });
            }
            
            const ticket = ticketControl.takeTicket(desktop);
            
            if(!ticket){
                return callback({
                    ok: false,
                    message: 'Sin tickets disponibles'
                });
            }else{
                callback({
                    ok: true,
                    message: 'exitoso',
                    ticket:ticket.number
                });
                // socket.broadcast.emit('get-last-tickets',ticketControl.toJson.last4);
            }
        });

        socket.on('get-last-tickets',(payload,callback)=>{
            callback(ticketControl.toJson.last4);
        });

        socket.on('get-tickets',(max=5,callback)=>{
            if(ticketControl.toJson.tickets.length>max){
                callback(ticketControl.toJson.tickets.slice(0,max));
            }else{
                callback(ticketControl.toJson.tickets);
            }
        })
    }

module.exports = {socketController};