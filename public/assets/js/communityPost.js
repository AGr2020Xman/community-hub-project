$(document).ready(function () {
  // Getting references to our form and input
  const communityCreate = $('form.community');
  const nameInput = $('input#name');
  const geoInput = $('input#geo');

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  const postCommunity = (name, geo) => {
    $.post('/api/community', {
      name: name,
      geo: GeoId,
    })
      .then(function (data) {
        window.location.replace('/community');
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  };
  
  const handleLoginErr = (err) => {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  };

  communityCreate.on('submit', function (event) {
    event.preventDefault();
    const newCommunity = {
      name: nameInput.val().trim(),
      geo: geoInput,
    };

    if (!newCommunity.name) {
      $('#incorrect').show().fadeOut(5000);
      return;
    }

    postCommunity(newCommunity.name, newCommunity.geo);
    nameInput.val('');
  });
});
