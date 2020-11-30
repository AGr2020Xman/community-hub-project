// Dependencies
let socket;

// Elements
const messageButtonEl = document.getElementById('message-submit');
const messageInputEl = document.getElementById('message-input');
const postsEl = document.getElementById('posts');
const chatActivityEl = document.getElementById('chat-activity');

// Globals
let userName = '';
const namespace = `${geo}-${community}`;

// Functions
const getWallUserInfo = async () => {
  return fetch('/api/user_data')
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const addPost = ({ user, message, date }) => {
  const time = date ? new Date(date) : new Date();
  const formattedTime = time.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
  const postCardEl = document.createElement('div');
  postCardEl.classList.add('card', 'mt-2', 'w-100');
  const postCardBodyEl = document.createElement('div');
  postCardBodyEl.classList.add('card-body', 'post');
  const cardTitleEl = document.createElement('div');
  cardTitleEl.classList.add('card-title', 'post-header');
  cardTitleEl.textContent = `${user} at ${formattedTime}`;
  const postText = document.createElement('p');
  postText.classList.add('post-text');
  postText.textContent = message;
  postCardBodyEl.appendChild(cardTitleEl);
  postCardBodyEl.appendChild(postText);
  postCardEl.appendChild(postCardBodyEl);
  //postsEl.appendChild(postCardEl);
  postsEl.prepend(postCardEl);
};

const createActivitySocket = () => {
  socket.on('typing', (data) => {
    const { isTyping, nick } = data;

    if (!isTyping) {
      chatActivityEl.textContent = '';
      return;
    }
    chatActivityEl.textContent = `${nick} is typing...`;
  });
};

const createMessageSocket = () => {
  socket.on('wall post', (data) => {
    addPost({
      user: data.nick,
      message: data.message,
    });
  });
};

const loginToNamespace = (userName) => {
  socket = io(`/${namespace}`);
  socket.emit('new user', userName);
  createMessageSocket();
  createActivitySocket();
};

const loginToMessaging = (user) => {
  userName = user;
  loginToNamespace(userName);
  console.log(`Logged in as: ${userName}`);
};

const populateWall = () => {
  fetch(`/api/posts/${namespace}`)
    .then((res) => res.json())
    .then((data) => {
      for (key in data) {
        addPost({
          user: data[key].user,
          message: data[key].message,
          date: data[key].timestamp,
        });
      }
    });
};

const initWall = async () => {
  wallUserInfo = await getWallUserInfo();
  userName = wallUserInfo.nickname;
  loginToMessaging(userName);
};

// Event listeners
messageButtonEl.addEventListener('click', (event) => {
  event.preventDefault();
  if (!messageInputEl.value) {
    return;
  }

  socket.emit('wall post', {
    message: messageInputEl.value,
    nick: userName,
    timestamp: new Date(),
  });

  messageInputEl.value = '';
});

messageInputEl.addEventListener('keyup', () => {
  socket.emit('typing', {
    isTyping: messageInputEl.value.length > 0,
    nick: userName,
  });
});

// Main
populateWall();
initWall();
