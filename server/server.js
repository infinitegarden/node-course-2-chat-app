const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const config = require('./config/config');
const publicPath = path.join(__dirname, '/../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('load-join', (params, callback) => {
        io.emit('updateRoomList', users.getRoomList());
    });
 
    socket.on('join', (params, callback) => {       
        var room;
        if (isRealString(params.newRoom)) {
            room = params.newRoom;
        } else {
            room = params.existingRoom;
        }

        if (!isRealString(params.name) || !isRealString(room)) {
            return callback('Name and room name are required');
        }
        if (users.getUserByName(params.name)) {
            return callback('Name is already taken. Please choose another.');
        }

        socket.join(room.toLowerCase());
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, room);

        // socket.leave('The Office Fans');

        // io.emit -> io.to('The Office Fans').emit
        // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
        // socket.emit -> leave as is, targets specific user already

        io.to(room.toLowerCase()).emit('updateUserList', users.getUserList(room.toLowerCase()));
        io.to(room.toLowerCase()).emit('setRoomName', room);

        socket.emit ('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(room.toLowerCase()).emit ('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room.toLowerCase()).emit('newMessage', generateMessage(user.name, message.text));
        }
        
        callback();
     });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        
        if (user) {
            io.to(user.room.toLowerCase()).emit ('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room.toLowerCase()).emit('updateUserList', users.getUserList(user.room.toLowerCase()));
            io.to(user.room.toLowerCase()).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });

});

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};

// IDEAS FOR ADDITION
// ------------------
// x make chat rooms case insensitive
// x make usernames unique - reject duplicates
// x add a list of currently active chat rooms
