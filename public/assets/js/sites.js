const createMyPageEl = document.getElementById('create-mypage');

createMyPageEl.addEventListener('click', (event) => {
  const newUrl = window.location.href + '/create';
  window.location.replace(newUrl);
});
