# Learn-Socket.io
Learn Socket.io (https://www.youtube.com/watch?v=ZKEqqIO7n-k&amp;list=LL&amp;index=25&amp;t=580s)

## 💎 Socket.io tutorial
- 설치한 패키지 : client-snowpack, socket-client / server-nodemon, socket
- client : npm start / server : npm run devStart
1. 일반적으로 fetch를 쓴다면 하나하나 전송할때마다 커넥션을 열어주어야 하지만, 소켓은 한번만 커넥션을 열어주면 서버-클라 간의 통신이 가능하다.
2. CORS 에러뜨는 이유 : 서버포트는 3000, 클라포트는 8080으로 다르기 때문에.
서버에서 아래와 같은 설정을 해주면 된다.


```
{
  cors: {
    origin:['클라가 있는 path쓰기']
  }
}

---
ex)

const io = require('socket.io')(3000, {
  cors: {
    origin: ['http://localhost:8080'],
  },
});
```

3. io.on():서버에서 소켓커넥션 열어주기 // const socket = io('http://localhost:3000'); - 클라:서버와 커넥트 하는것(서버path)
4. socket.emit() : 클라에서 서버로 보내는 이벤트. 보내는것은 어떤 형태든상관없다.
ex) socket.emit('custon-event', 10, 'Hi', { a: 'a' });
5. io.emit() : 서버에서from server, send message to every single socket out there
6. socket.on() : 받아오는이벤트
7. socket.broadcast.emit : 서버에서 자신을 제외한 클라에게 보내는것
8. every single user in socket.io has their own id : socket.id
9. socket.id를 이용하여 private message를 보낼수 있다.
  서버에서 socket.to(~~).emit()를 이용하여 해당 id를 가진 사람에게만 보낼수 있다.
  이용될수 있는것?..: 채팅에서 귓속말, sns 비공개 트윗 등
10. 서버에서 socket.join()을 이용하여 그룹채팅방을 만들수 있다.
11. 그룹 채팅방을 만들때 클라에서 어떤 방에 초대되었는지 나타내는 콜백함수를 함께 보내면 서버에서 메세지 내용을 처리한 후 ~~방에 초대되었습니다 같은 메세지를 띄울수 있음.
  클라에서 3번에서 설명했듯이 socket.emit('통신텍스트', 보내는인자, 콜백함수) 와 같이 인자 다음에 콜백함수도 보낼수 있다.
  이 콜백함수는 서버에서 불려지고, 다시 클라로 돌아온다. 이 콜백함수는 클라이언트에게 성공적으로 이루어졌다는걸 알리기위해서도(피드백 등) 이용가능하다.
12. npm i @socket.io/admin-ui -> admin 페이지에서 관리를 편하게 할수 있다
13. create own namespace : 서버에서 const userIo = io.of('/user');/ 클라에서 const userSocket = io('http://localhost:3000/user');
  namespace를 생성하면 authentication 등을 체크하는데에 도움이 된다!
14. 서버에서 미들웨어처리는 use를 이용 : io.use((socket, next) => {...})
15. 서버에서 handshake으로 미들웨어에서 headers, auth, query 등에 접근할 수 있다.
16. 에러처리 : 클라에서 userSocket.on('connect_error',(err) => console.log(err)); 과같이 메세지를 'connect_error'라고 써주면 된다.
17. 데이터연결이 없는동안 카톡을 받고, 이후 데이터연결후에 그동안 받았던 카톡이 모두 받아지는것처럼
  소켓에서도 비슷한것을 제어할수 있다. 클라에서 socket.emit('ping', ~)을 사용하면 카톡과 같은 기능이고,
  socket.volatile.emit('ping', ~)을 사용하면 연결이 끊겼던 offline일때 받았던 메세지는 보여지지 않는다.

- TODO : 3명이상이 채팅에 참여할때 나와 타인의 대화창 색깔다르게


