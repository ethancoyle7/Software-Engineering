

// Function will check if the firebase is initialize
function checkFireBase() {
  if (!firebase.apps.length) {
    console.log("Initializing Firebase App.");
    return firebaseApp = firebase.initializeApp(firebaseConfig);
  } else {
    console.log("Firebase has been Initialized.");
    return firebaseApp = firebase.app(); // if already initialized, use that one
  }
}

function signUp() {
  // Calling Firebase Initialization method to make sure that we initialized firebase
  firebaseApp = checkFireBase();
  // To sign up we have to strip the data from HTML and I made a function to get the elements that we need
  const signUp = document.body.querySelector('#signup-form');
  email = signUp['email'].value;
  password = signUp['email'].value;
  console.log(email + ' ' + password)
  // Sign up function
  firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    alert('Account has been created.');
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
}

// Function to SignIn into the user account
function signIn() {
  // Calling Firebase Initialization method to make sure that we initialized firebase
  firebaseApp = checkFireBase();
  // To sign in we have to strip the data from HTML and I made a function to get the elements that we need
  // Make sure user is logged in
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password).then((cred) => {
    alert("Login Successfully.");
    window.location.replace('/index.html');
  });
}
// Function to SignOut of the user account
function signOut() {
  // Calling Firebase Initialization method to make sure that we initialized firebase
  firebaseApp = checkFireBase();
  // Then call the signed out method
  firebaseApp.auth().signOut();

}

// Get the info from Firebase
function getInfo() {
  // Calling Firebase Initialization method to make sure that we initialized firebase
  firebaseApp = checkFireBase();
  firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) {
      // var displayName = user.displayName;
      var email = user.email;
      // var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      console.log('id: ' + uid + ', email: ' + email);                // ...
    } else {
      alert('User is signed out.');
    }
  });
}