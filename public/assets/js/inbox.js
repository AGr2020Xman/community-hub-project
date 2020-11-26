// Globals

// Elements
const inboxEl = document.querySelector(".inbox");
const newConversationButtonEl = document.querySelector(".new-conversation");
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

const openConversationHandler = (id) => {
  fetch(`/messages/${id}`).then(() => {
    window.location.href = `/messages/${id}`;
  });
};

// Event listener
inboxEl.addEventListener("click", (event) => {
  openConversationHandler(event.target.closest("[data-id]").dataset.id);
});
