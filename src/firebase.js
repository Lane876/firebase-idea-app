import firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyCWiy2YgHRlTeFZAlQ2NIxvP-__eXJwwXI",
  authDomain: "ideasaver-dcaf3.firebaseapp.com",
  databaseURL: "https://ideasaver-dcaf3.firebaseio.com",
  projectId: "ideasaver-dcaf3",
  storageBucket: "ideasaver-dcaf3.appspot.com",
  messagingSenderId: "1004785561289",
  appId: "1:1004785561289:web:39e4796294106eb213a718",
  measurementId: "G-10X8D5SYXF",
};

export const db = firebase.initializeApp(firebaseConfig);

export default db.database().ref();
