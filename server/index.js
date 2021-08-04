require('dotenv').config()
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
});
const cors = require('cors');

app.use(cors())

const Reception = require('./system/Reception');
const reception = new Reception();

io.on('connection', (socket) => {
    socket.on('queueUp', (data) => {
        var user = reception.createUser(socket, data);
        reception.match(user);
    });

    socket.on('message', (data) => {
        var { name } = reception.getRoom(socket.id);
        socket.broadcast.to(name).emit('message', data);
    });

    socket.on('leave', () => {
        var { name } = reception.getRoom(socket.id);

        socket.broadcast.to(name).emit("connection end");

        reception.destroyRoom(name);
    });

    socket.on('disconnect', () => {
        if(!reception.getUser(socket.id)) return;

        var { name } = reception.getRoom(socket.id);

        socket.broadcast.to(name).emit("connection end");

        reception.destroyRoom(name);
    });
});

http.listen(process.env.SOCKET_PORT, () => {
    console.log(`Listening to ${process.env.SOCKET_PORT}`);
})