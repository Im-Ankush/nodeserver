const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

const users = {};

// io.on('connection', (socket) => {
//   // console.log('a user connected');
//   socket.emit('user-joined', Name);
//   socket.on('disconnect', () => {
//     // console.log('user disconnected');
//     socket.on('disconnected', Name);
//   });
// });

io.on('connection', socket =>{
    socket.on('New-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name );

    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message : message, name : users[socket.id]})
    });
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// const io = require("socket.io")(5500, {
  //   cors: {
  //     origin: "*",
  //     methods: ["GET", "POST"]
  //   }
  // });



