let express = require('express');
let socket = require('socket.io');

// setup the express app
let app = express();
let server = app.listen(4000, () => {
    console.log('server is listening');
});

// manage static content as html and assets
app.use(express.static('public'));

// setup socket io backend
let io = socket(server);

// awaits for socket connections and does something
io.on('connection', (socket) => {
    console.log('socket connected');
    
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
});