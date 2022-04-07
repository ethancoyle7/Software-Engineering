
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
  // Initialize firestore to store the nickname into the database
  db = firebaseApp.firestore();
  // To sign up we have to strip the data from HTML and I made a function to get the elements that we need
  const signUp = document.body.querySelector('#signup-form');
  nickname = signUp['nickname'].value;
  email = signUp['email'].value;
  password = signUp['password'].value;
  console.log(email + ' ' + password)

  // Sign up function
  firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    alert('Account has been created.');
    db.collection('users').doc(cred.user.uid).set({
    // db.collection('users').add({
      nickname: nickname,
      color: null,
      fights: "0"
    })

    //   .then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch((error) => {
    //     console.error("Error adding document: ", error);
    // });
  })
    .catch(function (error) {
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
    window.location.replace('/game.html');
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
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
function getInfoFromFirebase() {
  // Calling Firebase Initialization method to make sure that we initialized firebase
  firebaseApp = checkFireBase();
  firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) 
    {
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

function checkIfUserIsLoggedIn(){
  if (user != null) // if the user is not null
  {
   alert("You already logged in. Redirecting...")
   window.location.replace('/game.html'); 
  }

}
