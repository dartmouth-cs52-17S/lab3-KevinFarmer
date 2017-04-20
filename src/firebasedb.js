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
export const database = firebase.database();

export function fetchNotes(callback) {
  // When the database changes, the callback function is called with the value
  database.ref('notes').on('value', (snapshot) => {
    if (snapshot.val() == null) {
      database.ref('maxZ').set(0);
    }
    callback(snapshot.val());
  });
}

export function fetchZ(callback) {
  // When the database changes, the callback function is called with the value
  database.ref('maxZ').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function createNote(note) {
  database.ref('notes').push(note);
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function updateNote(id, note) {
  database.ref('notes').child(id).update(note);
}

export function updateMaxZ(z) {
  database.ref('maxZ').set(z);
}
