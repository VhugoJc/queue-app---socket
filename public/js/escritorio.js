const lblDesktop = document.querySelector('#lblDesktop');
const divAlert = document.querySelector('#divAlert');
const btnTicket = document.querySelector('#btnTicket');
const lblTicket = document.querySelector('#lblTicket');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error ('El escritorio es obligatorio');
}


const desktop = searchParams.get('escritorio');

const socket = io();

const nextTicketsScreen=()=>{
    socket.emit('get-tickets',5,(element=[])=>{
        let nextTickets = '';
        element.forEach(ticket=>{
            nextTickets+=`${ticket.number} <br>`;
        })
        console.log(nextTickets);
        lblPendientes.innerHTML = nextTickets;
    });
}


socket.on('connect', () => {
    console.log('Conectado');
    btnTicket.disabled = false;
    lblDesktop.innerText = `Escritorio ${desktop}`;
    divAlert.style.display = 'none';
    nextTicketsScreen();
});
socket.on('disconnect', () => {
    btnTicket.disabled = true;
});
btnTicket.addEventListener('click',()=>{
    socket.emit('new-ticket',{desktop},({ok,message,ticket})=>{
        if(!ok){
            divAlert.style.display = '';
            divAlert.disabled=false;
            divAlert.innerText = message;
            lblTicket.innerText = "nadie";
            lblPendientes.innerText = '';
            return null;
        }
        lblTicket.innerText = ticket;
        nextTicketsScreen();
    });
});
