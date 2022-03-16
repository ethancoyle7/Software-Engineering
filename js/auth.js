// sign up
// that's how we query the element from the form login-holder
const signUp = document.body.querySelector('#signup-form');
// event listener when click on the sign up button
signUp.addEventListener('submit', (e) => {
  // prevent the default behavior of the form
  e.preventDefault();
  // get the userID and the password from the form
  const email = signUp['email'].value;
  const password = signUp['password'].value;
  // call the sign up function
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    alert('Account has been created.');
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  }).catch(err => {
    alert(err.message);
  });
});
// }).then(() => {
//   // close the signup modal & reset form
//   const modal = document.querySelector('#modal-signup');
//   M.Modal.getInstance(modal).close();
//   signupForm.reset();
//   signupForm.querySelector('.error').innerHTML = ''
// }).catch(err => {
//     // alert(err.message);
//   console.log("Email has been used.");
// });

// logout
// const logout = document.querySelector('#logout');
// logout.addEventListener('click', (e) => {
//   e.preventDefault();
//   auth.signOut().then(() => {
//     console.log('user signed out successfully.');
//   }).catch(err => {
//     alert(err.message);
//   });
// });

// login
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = loginForm['email'].value;
  const password = loginForm['password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    alert("Login Successfully.");
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  }).catch(err => {
    alert(err.message);
  });
});

