const userInputEl = document.getElementById("test-id");
const loginButtonEl = document.getElementById("login-button");

const channel = "test";

const loginToNamespace = (userName) => {
  const socket = io(`/${channel}`);
  socket.emit("new user", userName);
};

const loginHandler = () => {
  const userName = userInputEl.value;
  loginToNamespace(userName);
};

loginButtonEl.addEventListener("click", () => {
  loginHandler();
});
