// This function changes the navbar appearance when user scrolls down
$(function () {
  $(document).scroll(function () {
    var $nav = $(".fixed-top");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});

// This function is used to fade the go down arrow as user scrolls down
$(window).scroll(function () {
  $(".arrow").css("opacity", 1 - $(window).scrollTop() / 250);
});

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".active-user").text(data.nickname);
  });
});
