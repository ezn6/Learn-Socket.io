import { io } from 'socket.io-client';

const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

const socket = io('http://localhost:3000'); //서버와 커넥트 하는것
// socket.on('connect', () => {
//   displayMessage(`You connected with id : ${socket.id}`);
// }); //서버에서 받아온 이벤트

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
  socket.emit('send-message', message);

  messageInput.value = '';
});

joinRoomButton.addEventListener('click', () => {
  const room = roomInput.value;
});

function displayMessage(message) {
  //메세지 작성할때마다 div안에 div를 추가하는 함수
  const div = document.createElement('div');
  div.textContent = message;
  document.getElementById('message-container').append(div);
}
