const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Sab files ko public folder se load karne ke liye
app.use(express.static(path.join(__dirname, 'public')));

// Root URL par index.html dikhane ke liye
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin panel direct link
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

io.on('connection', (socket) => {
    socket.on('adminUpdate', (data) => {
        io.emit('predictionUpdate', data);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
