import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Component.extend({

  classNameBindings: [':x-writer', 'isFullscreen'],

  store: inject.service(),
  ui: inject.service(),

  title: null,
  body: null,

  isFullscreen: true,
  goTo: null, // closure

  actions: {
    save() {
      this.get('store').createRecord('post', {
        title: this.get('title'),
        body: this.get('body'),
      }).save().then((post) => {
        this.get('goTo')('post', post);
        this.set('ui.isWriting', false);
      }).catch(e => {
        console.log(e.errors);
      });
    },

    close() {
      this.set('ui.isWriting', false);
    },

    fullscreen() {
      this.toggleProperty('isFullscreen');
    }
  }

});
