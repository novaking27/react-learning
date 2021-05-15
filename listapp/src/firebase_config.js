import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAJbuxb5AVckT1cAnyp1Hy5MmJ1Lfuehao",
    authDomain: "todo-a52f7.firebaseapp.com",
    projectId: "todo-a52f7",
    storageBucket: "todo-a52f7.appspot.com",
    messagingSenderId: "673376992928",
    appId: "1:673376992928:web:fce27b38107f526a7213c5"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  
  export{db};