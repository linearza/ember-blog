import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Component.extend({

  classNames: ['x-nav'],

  session: inject.service(),

  actions: {
    logout: function() {
      this.get('session').close();
    }
  }

});
