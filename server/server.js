const io = require('socket.io')(3000, {
  cors: {
    origin: ['http://localhost:8080'],
  },
});

io.on('connection', (socket) => {
  console.log(socket.id);
  //socket.on('custom-event', (num, str, obj) => console.log(num, str, obj)); //클라에서 받아온것
  socket.on('send-message', (message) => {
    //io.emit('receive-message', message); 으로 보내면 자신을 포함한 모든 다른 클라이언트에게 모두 보내진다
    socket.broadcast.emit('receive-message', message); //자신을 포함하지않은 모든 다른 클라이언트에게 모두 보내진다
  });
});
