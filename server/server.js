const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const config = require('./config/config');
const publicPath = path.join(__dirname, '/../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

});

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};