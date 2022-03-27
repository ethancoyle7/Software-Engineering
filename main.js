var firebaseApp;

function sayHey(){
  console.log("Hey");
}

// Function will check if the firebase is initialize
function checkFireBase() {
  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
  } else {
    firebaseApp = firebase.app(); // if already initialized, use that one
  }
}

function signUp() {
  // Calling Firebase Initialization method to make sure that we initialized firebase
  checkFireBase();
  // To sign up we have to strip the data from HTML and I made a function to get the elements that we need
  GetDataFromHTML();
  // Sign up function
  firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

// Function to SignIn into the user account
function signIn() {
  // Calling Firebase Initialization method to make sure that we initialized firebase
  checkFireBase();
  // To sign in we have to strip the data from HTML and I made a function to get the elements that we need
  GetDataFromHTML();
  console.log(email+' '+ password);
  // Make sure user is logged in
  // firebaseApp.auth().onAuthStateChanged(function (user) {
  //   if (!user) {
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
      // });
    // }
    // else {
    //   console("Your already logged in. Redirecting...");
    //   window.location.replace('/index.html');
    // }
  });
}
// Function to SignOut of the user account
function signOut() {
  // Calling Firebase Initialization method to make sure that we initialized firebase
  checkFireBase();
  // Then call the signedOut function
  firebaseApp.auth().signOut().then(() => {
    // Sign-out successful.
    console.log('Signed out successfully');
  }).catch((error) => {
    console.log('Something went wrong.');
    // An error happened.
  });
}

// Get the info from Firebase
function getInfo() {
  // Calling Firebase Initialization method to make sure that we initialized firebase
  checkFireBase();
  firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) {
      // var displayName = user.displayName;
      var email = user.email;
      // var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      console.log('id: ' + uid + ', email: ' + email);                // ...
    } else {
      console.log('User is signed out.');
    }
  });
}

function GetDataFromHTML() {
  // var mail = document.getElementById("email").value.indexOf("@");
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
}

// // sign up
// // that's how we query the element from the form login-holder
// const signUp = document.body.querySelector('#signup-form');
// // event listener when click on the sign up button
// signUp.addEventListener('submit', (e) => {
//   // prevent the default behavior of the form
//   e.preventDefault();
//   // get the userID and the password from the form
//   const email = signUp['email'].value;
//   const password = signUp['password'].value;
//   // call the sign up function
//   auth.createUserWithEmailAndPassword(email, password).then(cred => {
//     // close the signup modal & reset form
//     alert('Account has been created.');
//     const modal = document.querySelector('#modal-signup');
//     M.Modal.getInstance(modal).close();
//     signupForm.reset();
//   }).catch(err => {
//     alert(err.message);
//   });
// });
// // }).then(() => {
// //   // close the signup modal & reset form
// //   const modal = document.querySelector('#modal-signup');
// //   M.Modal.getInstance(modal).close();
// //   signupForm.reset();
// //   signupForm.querySelector('.error').innerHTML = ''
// // }).catch(err => {
// //     // alert(err.message);
// //   console.log("Email has been used.");
// // });

// // logout
// // const logout = document.querySelector('#logout');
// // logout.addEventListener('click', (e) => {
// //   e.preventDefault();
// //   auth.signOut().then(() => {
// //     console.log('user signed out successfully.');
// //   }).catch(err => {
// //     alert(err.message);
// //   });
// // });

// // login
// const loginForm = document.querySelector('#loginForm');
// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   // get user info
//   const email = loginForm['email'].value;
//   const password = loginForm['password'].value;

//   // log the user in
//   auth.signInWithEmailAndPassword(email, password).then((cred) => {
//     alert("Login Successfully.");
//     window.location.replace('/index.html');
//     // close the signup modal & reset form
//     const modal = document.querySelector('#modal-login');
//     M.Modal.getInstance(modal).close();
//     loginForm.reset();
//   }).catch(err => {
//     alert(err.message);
//   });
// });

