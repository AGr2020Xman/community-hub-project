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
