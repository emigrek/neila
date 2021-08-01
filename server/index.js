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
        console.log(`User (${socket.id}) disconnected`);

        var user = reception.getUser(socket.id);
        if(!user) return;

        var { name, users } = reception.getRoom(socket.id);

        socket.broadcast.to(name).emit("connection end");

        var remain = users.filter(user => user.socket.id !== socket.id);

        reception.match(remain);
    });
});

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

http.listen(process.env.SOCKET_PORT, () => {
    console.log(`Listening to ${process.env.SOCKET_PORT}`);
})