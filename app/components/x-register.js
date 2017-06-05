import Ember from 'ember';
import firebase from 'firebase';

const {
  inject
} = Ember;

export default Ember.Component.extend({
  classNameBindings: [':x-register', 'errors'],

  session: inject.service(),

  errors: false,

  email: null,
  password: null,

  actions: {
    register: function() {

      firebase.auth().createUserWithEmailAndPassword(this.get('email'), this.get('password')).then(() => {
        console.log('success!');
        this.sendAction('onRegister');
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('errors', errorCode, errorMessage);
        // ...
      });

      // var fb = new Firebase("https://ember-blog-d8b5c.firebaseio.com");

      // fb.createUser({
      //   username: this.get('username'),
      //   password: this.get('password')
      // }, (error, userData) => {
      //   if (error) {
      //     console.log('error!');
      //     this.set('errors', true);
      //   } else {
      //     this.get('session').open('firebase', {
      //       provider: 'password',
      //       'username': this.get('username'),
      //       'password': this.get('password')
      //     }).then(() => {
      //       this.get('store').createRecord('user', {
      //         id: userData.uid,
      //         username: this.get('username'),
      //       })
      //     }).save();

      //     this.sendAction('onRegister');
      //   }
      // })

      // this.get('session').authenticate('authenticator:firebase', {
      //   'email': this.get('username'),
      //   'password': this.get('password')
      // }).then(() => {
      //   // this.transitionTo('index');
      //   this.sendAction('onLogin');
      // });
    }
  }
});
