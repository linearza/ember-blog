import firebase from 'firebase';

export function initialize() {
  var config = {
    apiKey: "AIzaSyB8XonRLT7ofxWO4dbWTpMaTRrpGQ2l8zQ",
    authDomain: "ember-blog-d8b5c.firebaseapp.com",
    databaseURL: "https://ember-blog-d8b5c.firebaseio.com",
    projectId: "ember-blog-d8b5c",
    storageBucket: "ember-blog-d8b5c.appspot.com",
    messagingSenderId: "692910046727"
  };
  firebase.initializeApp(config);
}

export default {
  name: 'firebase',
  initialize
};
