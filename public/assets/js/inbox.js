// Globals

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
const newMessageHandler = (recipient, messageText) => {
  const message = {
    recipient: recipient,
    messageText: messageText,
  };

  fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
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
