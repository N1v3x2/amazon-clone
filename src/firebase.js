import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAtOUBLFVUkq1G_ZJ9l_rAjVP62TeKpGLo",
    authDomain: "clone-e2792.firebaseapp.com",
    projectId: "clone-e2792",
    storageBucket: "clone-e2792.appspot.com",
    messagingSenderId: "740900773537",
    appId: "1:740900773537:web:94ea448304a6b5ba6b1ae0",
    measurementId: "G-EMK10NNCG2"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore(); //database
const auth = firebaseApp.auth(); //var to handle signing in, etc. 

export { db, auth };