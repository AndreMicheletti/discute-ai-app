import firebase from 'firebase';
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyBYNIKsskEsJYUNliwng3YfZrDtBP_pIjE",
  authDomain: "discute-ai.firebaseapp.com",
  databaseURL: "https://discute-ai.firebaseio.com",
  projectId: "discute-ai",
  storageBucket: "discute-ai.appspot.com",
  messagingSenderId: "358371345323",
  appId: "1:358371345323:web:e1ddb90a6a7007125888ee"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
