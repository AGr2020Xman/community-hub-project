$(document).ready(function () {
  const updateForm = $('form.update');
  const firstNameField = $('#firstNameField');
  const lastNameField = $('#lastNameField');
  const passwordField = $('#passwordField');

  const handleLoginErr = (err) => {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  };
  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  const updateUser = (firstName, lastName, password) => {
    $.ajax({
      url: '/api/users',
      method: 'PUT',
      data: {
        firstName,
        lastName,
        password,
      },
      success(req, res) {
        window.location.replace('/');
      },
    }).catch(handleLoginErr);
  };

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then((data) => {
    $('.active-user').text(data.nickname);
  });

  updateForm.on('submit', function (event) {
    event.preventDefault();
    const userDataProf = {
      firstName: firstNameField.val().trim(),
      lastName: lastNameField.val().trim(),
      password: passwordField.val().trim(),
    };
    console.log(userDataProf);
    if (!userDataProf.firstName || !userDataProf.lastName || !userDataProf.password) {
      $('#loginModalText').text("Please fill in all fields, even if it's with the same details.");
      $('#loginModal').modal('show').fadeOut(5000);
      console.log('error conditioned');
      return;
    }
    // If we have an email and password, run the updateUser function
    updateUser(userDataProf.firstName, userDataProf.lastName, userDataProf.password);
    firstNameField.val('');
    lastNameField.val('');
    passwordField.val('');
  });
});
