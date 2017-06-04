import Ember from 'ember';

const {
  run
} = Ember;

export default Ember.Route.extend({

  model() {
    return this.get('store').findAll('post');
  },

  setupController(controller, model) {
    this.controller.set('posts', model);

    $('.app-loader').addClass('fade-out');
    run.later(() => {
      $('.app-loader').remove();
    }, 500);
  }

});
