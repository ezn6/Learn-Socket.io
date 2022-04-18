const io = require('socket.io')(3000, {
  cors: {
    origin: ['http://localhost:8080'],
  },
});

const userIo = io.of('/user');
userIo.on('connection', (socket) => {
  console.log('connected to user namespace with username ' + socket.username);
});

userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUsernameFromToken(socket.handshake.auth.token);
    next();
  } else {
    next(new Error('Please send token'));
  }
});

function getUsernameFromToken(token) {
  return token;
  //이곳에서 db 접근 등 할수있는것이다.
}

io.on('connection', (socket) => {
  console.log(socket.id);
  // socket.on('custom-event', (num, str, obj) => console.log(num, str, obj)); //클라에서 받아온것
  socket.on('send-message', (message, room) => {
    // io.emit('receive-message', message); 으로 보내면 자신을 포함한 모든 다른 클라이언트에게 모두 보내진다
    // socket.broadcast.emit('receive-message', message); //자신을 포함하지않은 모든 다른 클라이언트에게 모두 보내진다
    if (room === '') {
      socket.broadcast.emit('receive-message', message);
    } else {
      socket.to(room).emit('receive-message', message);
    }
  });

  socket.on('join-room', (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`);
  });

  socket.on('ping', (num) => {
    console.log(num);
  });
});
