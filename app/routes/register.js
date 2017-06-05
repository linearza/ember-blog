import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    onRegister() {
      console.log('route');
      this.transitionTo('index');
    }
  }
});
