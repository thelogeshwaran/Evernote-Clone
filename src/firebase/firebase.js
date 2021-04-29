import firebase from "firebase"


var firebaseConfig = {
    apiKey: "AIzaSyAC_XiXtdXVB1D6jF-DeuNfDPKHvjBrrbM",
    authDomain: "evernote-clone-app-c2308.firebaseapp.com",
    projectId: "evernote-clone-app-c2308",
    storageBucket: "evernote-clone-app-c2308.appspot.com",
    messagingSenderId: "710788290466",
    appId: "1:710788290466:web:aebb383f969280e26e04fb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const useFirestore = firebase.firestore();
  const auth = firebase.auth();

  export { useFirestore, auth};