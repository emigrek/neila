const { nanoid } = require('nanoid');

class Reception {
    constructor() {
        this.queue = [];
        this.rooms = [];
        this.users = [];
    }

    match(user) {
        if(!queue) 
            return this.queue.push(user);

        var peer = this.queue.pop();
        var room = {
            name: nanoid(16),
            users: [ user, peer ]
        }

        peer.socket.join(room.name);
        user.socket.join(room.name);

        this.rooms.push(room);

        peer.socket.emit("connection established", { name: room.name, user: user });
        user.socket.emit("connection established", { name: room.name, user: peer });
    }

    createUser(socket, data) {
        var user = {
            socket: socket,
            data: data
        };

        this.users.push(user);

        return user;
    }

    getUser(socketId) {
        return this.users.filter(user => user.socket.id === socketId)[0];
    }

    getRoom(socketId) {
        return this.rooms.filter(room => room.users.includes(socketId))[0];
    }
};
module.exports = Reception;