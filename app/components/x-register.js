import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Component.extend({
  classNameBindings: [':x-register', 'errors:has-errors'],

  store: inject.service(),
  session: inject.service(),
  firebaseApp: inject.service(),

  errors: false,

  email: null,
  password: null,

  onRegister: null,

  actions: {
    register: function() {

      this.set('errors', false);

      if (!this.get('email') || !this.get('password')) {
        this.set('errors', 'The fields cannot be empty.');
        return;
      }

      this.get('firebaseApp').auth().createUserWithEmailAndPassword(this.get('email'), this.get('password')).then((userResponse) => {
        this.get('store').createRecord('user', {
          id: userResponse.uid,
          email: userResponse.email
        }).save().then(() => {
          this.get('session').open('firebase', {
            provider: 'password',
            email: this.get('email'),
            password: this.get('password')
          });
        }).then(() => {
          this.get('onRegister')();
        }).catch((errors) => {
          console.log('errors', errors, errors.errors);
        });

      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('errors', errorCode, errorMessage);
        this.set('errors', errorMessage);
        // ...
      });

    }
  }
});
