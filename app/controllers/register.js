import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    onRegister() {
      this.transitionToRoute('index');
    }
  }
});
