const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static('public'));

io.on('connection', (socket) => {
    // Admin jab update bhejega
    socket.on('adminUpdate', (data) => {
        io.emit('predictionUpdate', data);
    });
});

http.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
