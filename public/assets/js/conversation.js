/* eslint-env browser */
// Dependencies
/* eslint-disable */
const socket = io('/direct');
/* eslint-enable */

// Globals
let selfUserInfoAlt;
/* eslint-disable */
const conversationId = id;
/* eslint-enable */

// Elements
const myCustomScrollbarConversation = document.querySelector('.my-custom-scrollbar-conversation');
const sendButtonEl = document.querySelector('.button-send');
const messageFormInputEl = document.getElementById('message-form-input');
const conversationBodyEl = document.querySelector('.conversation-body');

// Perfect scrollbar init
const psConversation = new PerfectScrollbar(myCustomScrollbarConversation);
const scrollbarY = myCustomScrollbarConversation.querySelector(
  '.ps.ps--active-y>.ps__scrollbar-y-rail'
);
myCustomScrollbarConversation.onscroll = function () {
  scrollbarY.style.cssText = `top: ${this.scrollTop}px!important; height: 250px; right: ${-this
    .scrollLeft}px`;
};

// Functions
const getSelfUserInfoAlt = async () => {
  return fetch('/api/user_data')
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

/* eslint-disable */
const newUserConnected = async (user) => {
  //userName = user || `User${Math.floor(Math.random() * 1000000)}`;
  //socket.emit("new user", selfUserInfoAlt.nickname);
};

const addNewMessage = ({ user, message }) => {
  console.log({ user, message });
};
/* eslint-enable */

const formatTime = (date) => {
  const time = new Date(date);
  const formattedTime = time.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
  return formattedTime;
};

const addSentMessage = (message) => {
  const mediaEl = document.createElement('div');
  mediaEl.classList.add('media', 'mt-3');
  const mediaBodyEl = document.createElement('div');
  mediaBodyEl.classList.add('media-body');
  const messageHeaderEl = document.createElement('p');
  messageHeaderEl.classList.add('mt-0', 'font-weight-bold', 'small', 'mb-1');
  const timestampEl = document.createElement('span');
  timestampEl.classList.add('text-muted', 'small', 'mt-3p');
  timestampEl.textContent = formatTime(message.timestamp);
  messageHeaderEl.appendChild(timestampEl);
  const userEl = document.createElement('span');
  userEl.classList.add('float-right');
  userEl.textContent = message.user;
  messageHeaderEl.appendChild(userEl);
  mediaBodyEl.appendChild(messageHeaderEl);
  const messageEl = document.createElement('p');
  messageEl.classList.add(
    'mb-0',
    'font-weigh-light',
    'small',
    'primary-color',
    'text-white',
    'p-2',
    'rounded'
  );
  messageEl.textContent = message.message;
  mediaBodyEl.appendChild(messageEl);
  mediaEl.appendChild(mediaBodyEl);
  const avatarImageEl = document.createElement('img');
  avatarImageEl.classList.add(
    'avatar',
    'rounded-circle',
    'card-img-35',
    'z-depth-1',
    'd-flex',
    'ml-3'
  );
  avatarImageEl.setAttribute('src', 'https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg');
  avatarImageEl.setAttribute('alt', 'Generic placeholder image');
  mediaEl.appendChild(avatarImageEl);
  conversationBodyEl.appendChild(mediaEl);
};

const addReceivedMessage = (message) => {
  const mediaEl = document.createElement('div');
  mediaEl.classList.add('media', 'mt-3');
  const avatarImageEl = document.createElement('img');
  avatarImageEl.classList.add(
    'avatar',
    'rounded-circle',
    'card-img-35',
    'z-depth-1',
    'd-flex',
    'mr-3'
  );
  avatarImageEl.setAttribute('src', 'https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg');
  avatarImageEl.setAttribute('alt', 'Generic placeholder image');
  mediaEl.appendChild(avatarImageEl);
  const mediaBodyEl = document.createElement('div');
  mediaBodyEl.classList.add('media-body');
  const messageHeaderEl = document.createElement('p');
  messageHeaderEl.classList.add('mt-0', 'font-weight-bold', 'small', 'mb-1');
  messageHeaderEl.textContent = message.user;
  const timestampEl = document.createElement('span');
  timestampEl.classList.add('text-muted', 'float-right', 'small', 'mt-3p');
  timestampEl.textContent = formatTime(message.timestamp);
  messageHeaderEl.appendChild(timestampEl);
  mediaBodyEl.appendChild(messageHeaderEl);
  const messageEl = document.createElement('p');
  messageEl.classList.add(
    'mb-0',
    'font-weigh-light',
    'small',
    'grey',
    'lighten-2',
    'p-2',
    'rounded'
  );
  messageEl.textContent = message.message;
  mediaBodyEl.appendChild(messageEl);
  mediaEl.appendChild(mediaBodyEl);
  conversationBodyEl.appendChild(mediaEl);
};

/* eslint-disable */
const populateMessages = () => {
  fetch(`/api/messages/${conversationId}`)
    .then((res) => res.json())
    .then((data) => {
      for (key in data) {
        const message = {
          user: data[key].from,
          message: data[key].text,
          timestamp: data[key].timestamp,
        };
        message.user === selfUserInfo.nickname
          ? addSentMessage(message)
          : addReceivedMessage(message);
      }
    });
};
/* eslint-enable */

// Event listener
sendButtonEl.addEventListener('click', (event) => {
  event.preventDefault();
  if (!messageFormInputEl.value) {
    return;
  }
  socket.emit('direct message', {
    message: messageFormInputEl.value,
    nick: selfUserInfoAlt.nickname,
    timestamp: new Date(),
    id: conversationId,
  });

  messageFormInputEl.value = '';
});

// Init conversation room
const initConversation = async () => {
  selfUserInfoAlt = await getSelfUserInfoAlt();
  populateMessages();
};

// Main
initConversation();
newUserConnected();
socket.emit('direct', conversationId);
/* eslint-disable */
socket.on('direct message', (data) => {
  const message = {
    user: data.nick,
    message: data.message,
    timestamp: data.timestamp,
  };
  message.user === selfUserInfoAlt.nickname ? addSentMessage(message) : addReceivedMessage(message);
  // addNewMessage({
  //   user: data.nick,
  //   message: data.message,
  //   timestamp: data.timestamp
  // });

  /* eslint-enable */
});
