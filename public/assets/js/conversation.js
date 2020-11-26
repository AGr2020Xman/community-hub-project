// Dependencies
let socket = io("/direct");

// Globals
let userName = "";
let conversationId;
if (id) {
  conversationId = id;
} else {
  conversationId = "randomguid";
}

// Elements
const myCustomScrollbarConversation = document.querySelector(
  ".my-custom-scrollbar-conversation"
);
const sendButtonEl = document.querySelector(".button-send");
const messageFormInputEl = document.getElementById("message-form-input");
const conversationBodyEl = document.querySelector(".conversation-body");

// Perfect scrollbar init
const psConversation = new PerfectScrollbar(myCustomScrollbarConversation);
const scrollbarY = myCustomScrollbarConversation.querySelector(
  ".ps.ps--active-y>.ps__scrollbar-y-rail"
);
myCustomScrollbarConversation.onscroll = function () {
  scrollbarY.style.cssText = `top: ${
    this.scrollTop
  }px!important; height: 250px; right: ${-this.scrollLeft}px`;
};

// Functions
const newUserConnected = (user) => {
  userName = user || `User${Math.floor(Math.random() * 1000000)}`;
  socket.emit("new user", userName);
};

const addNewMessage = ({ user, message }) => {
  console.log({ user, message });
};

const addSentMessage = (message) => {
  console.log("sent");
  const mediaEl = document.createElement("div");
  mediaEl.classList.add("media", "mt-3");
  const mediaBodyEl = document.createElement("div");
  mediaBodyEl.classList.add("media-body");
  const messageHeaderEl = document.createElement("p");
  messageHeaderEl.classList.add("mt-0", "font-weight-bold", "small", "mb-1");
  const timestampEl = document.createElement("span");
  timestampEl.classList.add("text-muted", "small", "mt-3p");
  timestampEl.textContent = message.timestamp;
  messageHeaderEl.appendChild(timestampEl);
  const userEl = document.createElement("span");
  userEl.classList.add("float-right");
  userEl.textContent = message.user;
  messageHeaderEl.appendChild(userEl);
  mediaBodyEl.appendChild(messageHeaderEl);
  const messageEl = document.createElement("p");
  messageEl.classList.add(
    "mb-0",
    "font-weigh-light",
    "small",
    "primary-color",
    "text-white",
    "p-2",
    "rounded"
  );
  messageEl.textContent = message.message;
  mediaBodyEl.appendChild(messageEl);
  mediaEl.appendChild(mediaBodyEl);
  const avatarImageEl = document.createElement("img");
  avatarImageEl.classList.add(
    "avatar",
    "rounded-circle",
    "card-img-35",
    "z-depth-1",
    "d-flex",
    "ml-3"
  );
  avatarImageEl.setAttribute(
    "src",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg"
  );
  avatarImageEl.setAttribute("alt", "Generic placeholder image");
  mediaEl.appendChild(avatarImageEl);
  conversationBodyEl.appendChild(mediaEl);
};

const addReceivedMessage = (message) => {
  console.log("recieved");
  const mediaEl = document.createElement("div");
  mediaEl.classList.add("media", "mt-3");
  const avatarImageEl = document.createElement("img");
  avatarImageEl.classList.add(
    "avatar",
    "rounded-circle",
    "card-img-35",
    "z-depth-1",
    "d-flex",
    "mr-3"
  );
  avatarImageEl.setAttribute(
    "src",
    "https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg"
  );
  avatarImageEl.setAttribute("alt", "Generic placeholder image");
  mediaEl.appendChild(avatarImageEl);
  const mediaBodyEl = document.createElement("div");
  mediaBodyEl.classList.add("media-body");
  const messageHeaderEl = document.createElement("p");
  messageHeaderEl.classList.add("mt-0", "font-weight-bold", "small", "mb-1");
  messageHeaderEl.textContent = message.user;
  const timestampEl = document.createElement("span");
  timestampEl.classList.add("text-muted", "float-right", "small", "mt-3p");
  timestampEl.textContent = message.timestamp;
  messageHeaderEl.appendChild(timestampEl);
  mediaBodyEl.appendChild(messageHeaderEl);
  const messageEl = document.createElement("p");
  messageEl.classList.add(
    "mb-0",
    "font-weigh-light",
    "small",
    "grey",
    "lighten-2",
    "p-2",
    "rounded"
  );
  messageEl.textContent = message.message;
  mediaBodyEl.appendChild(messageEl);
  mediaEl.appendChild(mediaBodyEl);
  conversationBodyEl.appendChild(mediaEl);
};

// Event listener
sendButtonEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (!messageFormInputEl.value) {
    return;
  }
  socket.emit("direct message", {
    message: messageFormInputEl.value,
    nick: userName,
    timestamp: new Date(),
    id: conversationId,
  });

  messageFormInputEl.value = "";
});

// Init conversation room
newUserConnected();
socket.emit("direct", conversationId);
socket.on("direct message", (data) => {
  const message = {
    user: data.nick,
    message: data.message,
    timestamp: data.timestamp,
  };
  message.user === userName
    ? addSentMessage(message)
    : addReceivedMessage(message);
  // addNewMessage({
  //   user: data.nick,
  //   message: data.message,
  //   timestamp: data.timestamp
  // });
});
