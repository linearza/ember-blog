import Ember from 'ember';

const {
  run
} = Ember;

export default Ember.Route.extend({

  setupController(controller, model) {
    $('.app-loader').addClass('fade-out');
    run.later(() => {
      $('.app-loader').remove();
    }, 500);
  }

});
