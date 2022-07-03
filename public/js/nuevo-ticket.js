const lblTicket = document.querySelector("#lblTicket");
const btnTicket = document.querySelector("#btnTicket");

const socket = io();



socket.on('connect', () => {
    console.log('Conectado');
    btnTicket.disabled = false;
    socket.emit('get-last-ticket',null,(ticket)=>{
        lblTicket.innerText = `Último Ticket: ${ticket}`;
    })
});

socket.on('disconnect', () => {
    btnTicket.disabled = true;
});


btnTicket.addEventListener('click',()=>{
    socket.emit('next-ticket',null,(ticket)=>{
        lblTicket.innerText = ticket;

    });
});
