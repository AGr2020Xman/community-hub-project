$(document).ready(function () {
  // Getting references to our form and inputs
  const loginForm = $('form.login');
  const emailInput = $('input#email');
  const passwordInput = $('input#password');

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  const loginUser = (email, password) => {
    $.post('/api/login', {
      email,
      password,
    })
      .then(async () => {
        $('#loginModalText').text('Sign in: Success!');
        $('#loginModal').modal('show').fadeOut(2500);
        window.location.replace('/');
        // If there's an error, log the error
      })
      .catch(() => {
        $('#loginModalText').text('Sign in failed. Please check your login details.');
        $('#loginModal').modal('show').fadeOut(4000);
      });
  };
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on('submit', function (event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      $('#loginModalText').text('Sign in failed. Please check your login details.');
      $('#loginModal').modal('show').fadeOut(4000);
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });
});
