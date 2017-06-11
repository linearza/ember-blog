import Ember from 'ember';
import computed from 'ember-computed-decorators';

const {
  inject
} = Ember;

export default Ember.Controller.extend({

  ui: inject.service(),

  @computed('ui.isWriting')
  isScrollLocked(isWriting) {
    return isWriting;
  },

  actions: {
    goTo(type, item) {
      this.transitionToRoute(type, item);
    }
  }

});
