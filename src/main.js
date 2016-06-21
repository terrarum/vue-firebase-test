import PubSub from 'pubsub-js';
import Vue from 'vue';
import firebase from 'firebase/app';
import firebaseAuth from 'firebase/auth';
import firebaseDatabase from 'firebase/database';

const email = 'terrarum@gmail.com';
const password = 'terr4red';

var user;

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBdjIyOachKrsDeyDeFmefX56s2_Pf8Y1Q",
  authDomain: "vue-firebase-test.firebaseapp.com",
  databaseURL: "https://vue-firebase-test.firebaseio.com",
  storageBucket: "",
};

firebase.initializeApp(firebaseConfig);

/**
 * Toggles if user is signed in or signed out.
 */
firebase.auth().onAuthStateChanged(function(u) {
  if (u) {
    user = firebase.auth().currentUser;
    console.log('User:', user);

    letsgo();
  } else {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.log('User Error:', error);
    });
  }
});

const textInput = document.querySelector('.js-text');
const textButton = document.querySelector('.js-text-button');
let textInputValue;

const letsgo = function letsgo() {
  console.log('Let\'s Go!');

  // Subscribe to 'welcomes';
  // firebase.database().ref('user/' + user.uid + '/welcomes').on('value', function(snapshot) {
  //   console.log(snapshot.val());
  // });

  const welcomesRef = firebase.database().ref('user/' + user.uid + '/welcomes/');
  welcomesRef.on('child_added', (data) => {
    console.log(data);
  });

  // When button is clicked.
  textButton.addEventListener('click', () => {
    // Get text input value and clear value.
    textInputValue = textInput.value;
    textInput.value = '';

    // Push value to database.
    firebase.database().ref('user/' + user.uid + '/welcomes/').push(textInputValue);
  });

};
