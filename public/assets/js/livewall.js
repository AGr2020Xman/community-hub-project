// Dependencies
let socket;

// Elements
const messageButtonEl = document.getElementById("message-submit");
const messageInputEl = document.getElementById("message-input");
const postsEl = document.getElementById("posts");
const chatActivityEl = document.getElementById("chat-activity");

// Globals
const namespace = "test";
let userName = "";

// Functions
const addPost = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const postCardEl = document.createElement("div");
  postCardEl.classList.add("card", "mt-2");
  const postCardBodyEl = document.createElement("div");
  postCardBodyEl.classList.add("card-body", "post");
  const cardTitleEl = document.createElement("div");
  cardTitleEl.classList.add("card-title", "post-header");
  cardTitleEl.textContent = `${user} at ${formattedTime}`;
  const postText = document.createElement("p");
  postText.classList.add("post-text");
  postText.textContent = message;
  postCardBodyEl.appendChild(cardTitleEl);
  postCardBodyEl.appendChild(postText);
  postCardEl.appendChild(postCardBodyEl);
  postsEl.appendChild(postCardEl);
};

const createActivitySocket = () => {
  socket.on("typing", (data) => {
    const { isTyping, nick } = data;

    if (!isTyping) {
      chatActivityEl.textContent = "";
      return;
    }
    chatActivityEl.textContent = `${nick} is typing...`;
  });
};

const createMessageSocket = () => {
  socket.on("chat message", (data) => {
    addPost({
      user: data.nick,
      message: data.message,
    });
  });
};

const loginToNamespace = (userName) => {
  socket = io(`/${namespace}`);
  socket.emit("new user", userName);
  createMessageSocket();
  createActivitySocket();
};

const loginToMessaging = (user) => {
  userName = user;
  loginToNamespace(userName);
  console.log(`Logged in as: ${userName}`);
};

// Event listeners
messageButtonEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (!messageInputEl.value) {
    return;
  }

  socket.emit("chat message", {
    message: messageInputEl.value,
    nick: userName,
    timestamp: new Date(),
  });

  messageInputEl.value = "";
});

messageInputEl.addEventListener("keyup", () => {
  socket.emit("typing", {
    isTyping: messageInputEl.value.length > 0,
    nick: userName,
  });
});
