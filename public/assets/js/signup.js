$(document).ready(function() {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email");
  const passwordInput = $("input#password");
  const nicknameInput = $("input#nickname");
  const firstNameInput = $("input#firstName");
  const lastNameInput = $("input#lastName");

// Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  const signUpUser = (firstName, lastName, email, nickname, password) => {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      nickname: nickname,
      password: password
    })
      .then(function(data) {
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  const handleLoginErr = (err) => {
    $("#alert .msg").text('Sign up failed');
    $("#alert").fadeIn(500);
  }

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    const userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      nickname: nicknameInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.firstName || !userData.lastName || !userData.email || !userData.nickname || !userData.password) {
      $('#incorrect').show().fadeOut(5000);
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.firstName, userData.lastName, userData.email, userData.nickname, userData.password);
    emailInput.val("");
    passwordInput.val("");
    nicknameInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
  });
});
