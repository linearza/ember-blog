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
    login(provider) {
      this.set('errors', false);

      if (provider === 'github') {
        this.get('session').open('firebase', {
          provider: 'github',
          settings: {
            scope: 'user,gist',
          }
        }).then((data) => {
          if (this.get('onLogin')) {
            this.get('onLogin')();
          }
        });
      } else {

        this.get('session').open('firebase', {
          provider: 'password',
          email: this.get('email'),
          password: this.get('password')
        }).then(() => {
          if (this.get('onLogin')) {
            this.get('onLogin')();
          }
        }).catch((errors) => {
          var errorCode = errors.code;
          var errorMessage = errors.message;
          console.log('errors', errorCode, errorMessage);

          this.set('errors', errorMessage);
        });

      }
    }
  }
});
