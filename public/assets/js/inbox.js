// Globals
let selfUserInfo = "1d6bf09a-4b99-498f-af74-af694f342723";

// Elements
const inboxEl = document.querySelector(".inbox");
const recipientInputEl = document.getElementById("recipient-nick");
const newMessageInputEl = document.getElementById("new-message-text");
const newSendButtonEl = document.getElementById("new-send-button");

// const myCustomScrollbarInbox = document.querySelector(
//   ".my-custom-scrollbar-inbox"
// );

// Perfect scrollbar init
// const psInbox = new PerfectScrollbar(myCustomScrollbarInbox);
// const scrollbarY = myCustomScrollbarInbox.querySelector(
//   ".ps.ps--active-y>.ps__scrollbar-y-rail"
// );
// myCustomScrollbarInbox.onscroll = function () {
//   scrollbarY.style.cssText = `top: ${
//     this.scrollTop
//   }px!important; height: 250px; right: ${-this.scrollLeft}px`;
// };

// Functions
const getSelfUserInfo = async () => {
  fetch("/api/user_data")
    .then((res) => res.json())
    .then((data) => {
      selfUserInfo = data;
      console.log(data);
    });
};

const newMessageHandler = async (recipient, messageText) => {
  const messageData = {
    from: selfUserInfo.uniqueIdentifier,
    to: recipient,
    timestamp: new Date(),
    text: messageText,
  };

  fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
      window.location.reload();
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

const openConversationHandler = (id) => {
  fetch(`/messages/${id}`).then(() => {
    window.location.href = `/messages/${id}`;
  });
};

// Event listener
inboxEl.addEventListener("click", (event) => {
  openConversationHandler(event.target.closest("[data-id]").dataset.id);
});

newSendButtonEl.addEventListener("click", () => {
  const recipient = recipientInputEl.value;
  const message = newMessageInputEl.value;
  newMessageHandler(recipient, message);
});

// Init
//getSelfUserInfo();
