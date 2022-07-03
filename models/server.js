const express = require('express')
require('dotenv').config(); //default config
const cors = require('cors');
const { socketController } = require('../socket/controller');
const TicketControl = require('./ticket-control');


class Server{
    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;
        //socket config:
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server); //info sockets
        // http://localhost:5000/socket.io/socket.io.js
        const ticketControl = new TicketControl();
        ticketControl.init();

        //Middleware
        this.middlewares();

        //app routes
        this.routes();

        //socket events
        this.sockets();

    }

    middlewares(){
        // parse and read body
        this.app.use(express.json());
        //CORS
        this.app.use(cors());
        //public folder
        this.app.use(express.static('public'));
    }

    routes(){
        // this.app.use(this.usersPath,require('../routes/user'));
    }

    listen(){
        this.server.listen(this.port,()=>{
            console.log(`Server Running in port ${this.port}`);
        })
    }

    sockets(){
        this.io.on('connection', socketController);
    }
}


module.exports = Server