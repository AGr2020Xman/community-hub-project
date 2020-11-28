const db = require("../../../models");

$(() => {
    $(".searchEngine").autocomplete({
      source: async function (req, res) {
        pageOptions = await searchAllSites(req.partial);
        let pageSuggestion = $.map(pageOptions, (element) => {
          return {
            label: element.title + " - " + element.CommunityId,
            value: element.title,
          };
        });
        response(pageSuggestion);
      },
      minLength: 3,
      select: function (event, ui) {},
      _renderItem: function (ul, item) {
        return $("<li>")
          .attr({ "data-value": item.value, class: "list-group-item" })
          .append(item.label)
          .appendTo(ul);
      },
    });
})

// Otherwise we log any errors
const searchAllSites = () => {
    console.log();
    db.myPage.findAll({include: []}) //
    ("/api/sites", {
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
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }