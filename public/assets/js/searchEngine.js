/* eslint-disable no-underscore-dangle */
const db = require('../../../models');

$(() => {
  $('.searchEngine').autocomplete({
    async source (req, res) {
      pageOptions = await searchAllSites(req.partial);
      let pageSuggestion = $.map(pageOptions, (element) => {
        return {
          label: `${element.name} ${element.CommunityId}`,
          value: `${element.name}`,
        };
      });
      response(pageSuggestion);
    },
    minLength: 3,
    select (event, ui) {},
    _renderItem (ul, item) {
      return $('<li>')
        .attr({ 'data-value': item.value, class: 'list-group-item' })
        .append(item.label)
        .appendTo(ul);
    },
  });
});

// Otherwise we log any errors
const searchAllSites = () => {
  console.log();
  db.myPage
    .findAll({ include: [] })(
      //
      '/api/sites',
      {
        firstName,
        lastName,
        email,
        nickname,
      password
      }
    )
    .then(function (data) {
      window.location.replace('/login');
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(handleLoginErr);
};

const handleLoginErr = (err) => {
  $('#alert .msg').text(err.responseJSON);
  $('#alert').fadeIn(500);
};
