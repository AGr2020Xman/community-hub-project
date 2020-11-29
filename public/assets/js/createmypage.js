/* eslint-env browser */
const pageInfo = {
  geo: geo,
  community: community,
};
console.log(pageInfo);
const createMyPageEl = document.getElementById('create-mypage');
const mpTitleEl = document.getElementById('mp-title');
const mpUrlEl = document.getElementById('mp-url');
const mpHtmlEl = document.getElementById('mp-html');

createMyPageEl.addEventListener('click', () => {
  pageInfo.title = mpTitleEl.value;
  pageInfo.name = mpUrlEl.value;
  pageInfo.html = mpHtmlEl.value;
  fetch('/api/sites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pageInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Success: ', data);
      const url = `${window.location.origin}/sites/${pageInfo.geo}/${pageInfo.community}/${pageInfo.name}`;
      window.location.replace(url);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
});
