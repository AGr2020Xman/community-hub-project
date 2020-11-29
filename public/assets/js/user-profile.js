$(document).ready(function () {
  const updateForm = $('form.update');
  const firstNameField = $('form#firstNameField');
  const lastNameField = $('form#lastNameField');
  const passwordField = $('form#passwordField');

  const handleLoginErr = (err) => {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  };
  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  const updateUser = (firstName, lastName, password) => {
    $.put('/api/users', {
      firstName: firstName,
      lastName: lastName,
      password: password,
    })
      .then((data) => {
        window.location.replace('/user-profile');
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  };

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then((data) => {
    $('.active-user').text(data.nickname);
  });

  $.put('/api/users').then((req, res) => {
    // When the signup button is clicked, we validate the email and password are not blank
    updateForm.on('submit', function (event) {
      event.preventDefault();
      if (!userData.firstName || !userData.lastName || !userData.password) {
        $('#loginModalText').text("Please fill in all fields, even if it's with the same details.");
        $('#loginModal').modal('show').fadeOut(5000);
        return;
      }
      const userData = {
        firstName: firstNameField.val().trim(),
        lastName: lastNameField.val().trim(),
        password: passwordField.val().trim(),
      };

      // If we have an email and password, run the updateUser function
      updateUser(userData.firstName, userData.lastName, userData.password);
      firstNameField.val('');
      lastNameField.val('');
      passwordField.val('');
    });
  });
});
