const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

module.exports = { io };

const { SocketController } = require('./SocketController');

const publicPath = path.join(__dirname, '../../build');
const PORT = process.env.PORT || 3231;

app.use(express.static(publicPath));

io.on('connection', SocketController);

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});

