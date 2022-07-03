
const numLastTickets = 4;


const getTicketsOnScreen=(lastTickets)=>{
    for(let i=0; i<numLastTickets; i++){
        if(lastTickets[i]?.number){
            document.querySelector(`#lblTicket${i+1}`).innerText = `Ticket ${lastTickets[i].number}`
            document.querySelector(`#lblEscritorio${i+1}`).innerText = `Escritorio ${lastTickets[i].desktop}`
        }else{
            document.querySelector(`#lblTicket${i+1}`).innerText = `-`
            document.querySelector(`#lblEscritorio${i+1}`).innerText = ``
        }
    }
}

const socket = io();
socket.on('connect',()=>{
    console.log('conectado');
    socket.emit('get-last-tickets',null,(lastTickets)=>{
        getTicketsOnScreen(lastTickets);
        
    });
});

socket.on('get-last-tickets',(lastTickets)=>{
    getTicketsOnScreen(lastTickets); 
});