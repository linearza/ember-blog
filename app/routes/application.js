import Ember from 'ember';

const {
  run,
  inject
} = Ember;

export default Ember.Route.extend({

  session: inject.service(),

  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },

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
