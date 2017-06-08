import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Component.extend({
  classNameBindings: [':x-login', 'errors:has-errors'],

  session: inject.service(),

  errors: false,

  email: null,
  password: null,

  onLogin: null, //closure

  actions: {
    login: function() {

      this.set('errors', false);

      this.get('session').open('firebase', {
        provider: 'password',
        email: this.get('email'),
        password: this.get('password')
      }).then(() => {
        this.sendAction('onLogin');
      }).catch((errors) => {
        var errorCode = errors.code;
        var errorMessage = errors.message;
        console.log('errors', errorCode, errorMessage);

        this.set('errors', errorMessage);
      });
    }
  }
});
