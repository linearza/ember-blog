import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    onLogin() {
      console.log('route');
      this.transitionTo('index');
    }
  }

});
