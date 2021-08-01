require('dotenv').config()
const io = require("socket.io")(process.env.SOCKET_PORT);

const Reception = require('./system/Reception');
const reception = new Reception();

io.on('connection', (socket) => {
    console.log(`User (${socket.id}) connected`);

    socket.on('queueUp', (data) => {
        var user = reception.createUser(socket, data);
        reception.match(user);
    });

    socket.on('message', (data) => {
        var { name } = reception.getRoom(socket.id);
        socket.broadcast.to(name).emit('message', data);
    });

    socket.on('leave', () => {
        var { name, users } = reception.getRoom(socket.id);

        socket.broadcast.to(name).emit("connection end");

        for(user of users) {
            reception.match(user);
        }
    });

    socket.on('disconnect', () => {
        var { name, users } = reception.getRoom(socket.id);

        socket.broadcast.to(name).emit("connection end");

        var remain = users.filter(user => user.socket.id !== socket.id);

        reception.match(remain);
    });
});