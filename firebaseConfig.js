// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = { 
  apiKey: "AIzaSyCRKIp_ALm8rO_hNMtZ0CXWXcXis_6198w",
  authDomain: "smartpet-28571.firebaseapp.com",
  databaseURL: "https://smartpet-28571-default-rtdb.firebaseio.com",
  projectId: "smartpet-28571",
  storageBucket: "smartpet-28571.appspot.com",
  messagingSenderId: "1008461771159",
  appId: "1:1008461771159:web:618a4b000cdf363327d4d2",
  measurementId: "G-Z54X7CR8GS"
};

// Initialize Firebase
firebaseApp = firebase.initializeApp(firebaseConfig);
auth = firebase.auth();
db = firebase.firestore();


// const analytics = getAnalytics(firebaseApp);


