import Ember from 'ember';
import firebase from 'firebase';

const {
  inject
} = Ember;

export default Ember.Component.extend({
  classNameBindings: [':x-login', 'errors'],

  // session: inject.service(),

  errors: false,

  email: null,
  password: null,

  onLogin: null, //closure

  actions: {
    login: function() {
      firebase.auth().signInWithEmailAndPassword(this.get('email'), this.get('password')).then(() => {
        console.log('success!');
        this.sendAction('onLogin');
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('errors', errorCode, errorMessage);
        // ...
      });
    }
  }
});
