const { nanoid } = require('nanoid');

class Reception {
    constructor() {
        this.queue = [];
        this.rooms = [];
        this.users = [];
    }

    match(user) {
        if(this.queue.length < 1) 
            return this.queue.push(user);

        var peer = this.queue.pop();
        var room = {
            name: nanoid(16),
            users: [ user, peer ]
        }

        peer.socket.join(room.name);
        user.socket.join(room.name);

        this.rooms.push(room);

        peer.socket.emit("connection established", { name: room.name, user: user.data });
        user.socket.emit("connection established", { name: room.name, user: peer.data });
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
        var found = false;

        this.rooms.forEach(room => {
            room.users.forEach(user => {
                if(user.socket.id == socketId) found = room;
            });
        });

        return found;
    }

    destroyRoom(name) {
        this.rooms = this.rooms.filter(room => room.name !== name);
    }
};
module.exports = Reception;