$(document).ready(function() {
    // Getting references to our form and inputs
    const loginForm = $("form.login");
    const emailInput = $("input#email");
    const passwordInput = $("input#password");
    
  
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
      const userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        $('#incorrect').show().fadeOut(10000);
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    const loginUser = (email, password) => {
      $.post("/api/login", {
        email: email,
        password: password
      })
        .then(async (res, req) => {
          $("#loginModalText").text("Sign in: Success!");
		      await $("#loginModal").modal("show").fadeOut(2500);
          window.location.replace("/");
          // If there's an error, log the error
        })
        .catch((err) => {
          $("#loginModalText").text("Sign in failed. Please check your login details.");
          $("#loginModal").modal("show").fadeOut(4000);
        });
      }
    });
