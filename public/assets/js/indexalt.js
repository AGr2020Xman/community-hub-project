/* eslint-env browser, jquery */
$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then((data) => {
    $('.active-user').text(data.nickname);
  });
});

// Globals
let userData;

// Elements
const homeDropDownEl = document.querySelector('.default-dropdown');

// Functions
const renderLoginMenu = () => {
  homeDropDownEl.innerHTML = '';
  const userProfEl = document.createElement('a');
  userProfEl.classList.add('dropdown-item');
  userProfEl.setAttribute('href', '/user-profile');
  userProfEl.textContent = 'Profile';
  homeDropDownEl.appendChild(userProfEl);
  const logoutEl = document.createElement('a');
  logoutEl.classList.add('dropdown-item');
  logoutEl.setAttribute('href', '/logout');
  logoutEl.textContent = 'Logout';
  homeDropDownEl.appendChild(logoutEl);
};

const initAlt = async () => {
  userData = await checkAuth();
  if (userData) {
    renderLoginMenu();
  }
};

// Init
initAlt();
