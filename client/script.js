import { io } from 'socket.io-client';

const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

const socket = io('http://localhost:3000'); //서버와 커넥트 하는것
const userSocket = io('http://localhost:3000/user', {
  auth: { token: 'Test' },
});

socket.on('connect', () => {
  displayMessage(`You connected with id : ${socket.id}`);
}); //서버에서 받아온 이벤트

userSocket.on('connect_error', (err) => displayMessage(err));

// socket.emit('custom-event', 10, 'Hi', { a: 'a' }); //클라에서 서버로 보내는 이벤트

socket.on('receive-message', (message) => {
  displayMessage(message);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === '') return;
  displayMessage(message);
  socket.emit('send-message', message, room);

  messageInput.value = '';
});

joinRoomButton.addEventListener('click', () => {
  const room = roomInput.value;
  socket.emit('join-room', room, (roomName) => {
    displayMessage(roomName);
  });
});

function displayMessage(message) {
  //메세지 작성할때마다 div안에 말풍선div를 추가하는 함수
  const div = document.createElement('div');
  div.textContent = message;
  document.getElementById('message-container').append(div);
}

let count = 0;
setInterval(() => {
  // socket.emit('ping', ++count);
  socket.volatile.emit('ping', ++count);
}, 1000);

document.addEventListener('keydown', (e) => {
  if (e.target.matches('input')) return;

  if (e.key === 'c') socket.connect();
  if (e.key === 'd') socket.disconnect();
});
