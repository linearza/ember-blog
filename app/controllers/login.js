import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    onLogin() {
      this.transitionToRoute('index');
    }
  }
});
