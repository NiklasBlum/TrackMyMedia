import firebase from "firebase/app";
import "firebase/firestore";
import store from "@/store/index.js";

var config = {
  apiKey: "AIzaSyDuZMGMlJ4Fh40aBN1uJ5EwOOQ9Kql5Vso",

  authDomain: "track-my-media.firebaseapp.com",
  databaseURL: "https://track-my-media.firebaseio.com",
  projectId: "track-my-media",
  storageBucket: "",
  messagingSenderId: "799543490503",
  appId: "1:799543490503:web:69c502330782ad48"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      store.commit("setUser", user);
      resolve(user);
    }, reject);
  });
};

export default firebaseApp.firestore();
