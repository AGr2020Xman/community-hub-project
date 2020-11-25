// Globals

// Elements
const inboxEl = document.querySelector(".inbox");
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

// Event listener
inboxEl.addEventListener("click", (event) => {
  console.log(event.target.closest("[data-id]").dataset.id);
});
