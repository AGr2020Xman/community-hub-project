const pageInfo = {
  geo: "{{{geo}}}",
  community: "{{{community}}}",
};
const createMyPageEl = document.getElementById("create-mypage");
const mpTitleEl = document.getElementById("mp-title");
const mpUrlEl = document.getElementById("mp-url");
const mpHtmlEl = document.getElementById("mp-html");

createMyPageEl.addEventListener("click", (event) => {
  pageInfo.title = mpTitleEl.value;
  pageInfo.name = mpUrlEl.value;
  pageInfo.html = mpHtmlEl.value;
  console.log(pageInfo);
  fetch("/api/sites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pageInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success: ", data);
    })
    .catch((err) => {
      console.error(`Error: ${error}`);
    });
});
