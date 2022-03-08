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
        console.log(cred.user);
    });
});
// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out');
  })
});

// login
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user info
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log(cred.user);
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});

