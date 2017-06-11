import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Component.extend({
  classNames: ['the-button', 'add', 'large', 'inv'],
  tagName: 'button',

  ui: inject.service(),

  click() {
    this.set('ui.isWriting', true);
  }


});
