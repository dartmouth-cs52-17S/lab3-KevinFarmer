import firebase from 'firebase';


// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCcSY1cItG0yNsLz0eSLbT-pLTmqCgvwP4',
  authDomain: 'cs52-lab3.firebaseapp.com',
  databaseURL: 'https://cs52-lab3.firebaseio.com',
  projectId: 'cs52-lab3',
  storageBucket: 'cs52-lab3.appspot.com',
  messagingSenderId: '864094906838',
};
firebase.initializeApp(config);


// Get a reference to the database service
const database = firebase.database();
