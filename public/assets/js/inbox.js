/* eslint-env browser */

// Globals
let msgUserInfo;

// Elements
const inboxEl = document.querySelector('.inbox');
const recipientInputEl = document.getElementById('recipient-nick');
const newMessageInputEl = document.getElementById('new-message-text');
const newSendButtonEl = document.getElementById('new-send-button');

// Functions
const getMsgUserInfo = async () => {
  return fetch('/api/user_data')
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const newMessageHandler = async (recipient, messageText) => {
  const messageData = {
    from: msgUserInfo.nickname,
    to: recipient,
    timestamp: new Date(),
    text: messageText,
  };

  fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Success:', data);
      window.location.reload();
    })
    .catch((err) => {
      console.error('Error:', err);
    });
};

const openConversationHandler = (id) => {
  fetch(`/messages/${id}`).then(() => {
    window.location.href = `/messages/${id}`;
  });
};

const createHeader = (header) => {
  const headerEl = document.createElement('div');
  headerEl.classList.add('media', 'conversation');
  headerEl.setAttribute('data-id', header.id);
  const headerBodyEl = document.createElement('div');
  headerBodyEl.classList.add('media-body');
  const headerTitle = document.createElement('p');
  headerTitle.classList.add('mt-0', 'font-weight-bold', 'small', 'mb-1');
  headerTitle.textContent = header.participant;
  const headerTitleTimeStamp = document.createElement('span');
  headerTitleTimeStamp.classList.add('text-muted', 'float-right', 'small', 'mt-3p');
  headerTitleTimeStamp.textContent = header.timestamp;
  headerTitle.appendChild(headerTitleTimeStamp);
  headerBodyEl.appendChild(headerTitle);
  const headerMessage = document.createElement('p');
  headerMessage.classList.add(
    'mb-0',
    'font-weight-light',
    'small',
    'grey',
    'lighten-2',
    'p-2',
    'rounded'
  );
  headerMessage.textContent = header.text;
  headerBodyEl.appendChild(headerMessage);
  headerEl.append(headerBodyEl);
  inboxEl.prepend(headerEl);
};

const populateHeaders = (headers) => {
  headers.forEach((header) => {
    // Fix timestamp
    const time = new Date(header.messageData.timestamp);
    // Trim message
    const messageText = header.messageData.text.substring(0, 64);
    const formattedTime = time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
    const cleanedHeader = {
      id: header.id,
      participant: header.participant,
      timestamp: formattedTime,
      text: messageText,
    };
    createHeader(cleanedHeader);
  });
};

const getHeaders = async () => {
  const params = new URLSearchParams({
    headers: 'true',
    originId: msgUserInfo.nickname,
  });
  const url = `/api/messages?${params.toString()}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const init = async () => {
  msgUserInfo = await getMsgUserInfo();
  const headers = await getHeaders();
  populateHeaders(headers);
};

// Event listener
inboxEl.addEventListener('click', (event) => {
  openConversationHandler(event.target.closest('[data-id]').dataset.id);
});

newSendButtonEl.addEventListener('click', () => {
  const recipient = recipientInputEl.value;
  const message = newMessageInputEl.value;
  newMessageHandler(recipient, message);
});

// Init
init();
