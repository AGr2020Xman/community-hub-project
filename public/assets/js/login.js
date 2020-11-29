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
        console.log('Matching email and password are required.'); //put a div alert here for login page
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
        .then(() => {
          window.location.replace("/");
          // If there's an error, log the error
        })
        .catch((err) => {
          console.log('failed to login', err);
          // window.location.replace("/login/error");

        });
    }
  
    // THEN check if the answer user selected is CORRECT or not
    // isCorrectAnswer = question.answerId === item.id;
    // if (isCorrectAnswer) {
    //   showFeedback(isCorrectAnswer);
    // } else {
    //   // IF answer is incorrect - penalise time (10s)
    //   showFeedback(isCorrectAnswer);
    // }
  
  
    
 

  });