import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.get('store').findAll('post');
  },

  setupController(controller, model) {
    this.controller.set('posts', model);
  }

});
