import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Component.extend({

  classNameBindings: [':x-writer', 'isFullscreen'],

  store: inject.service(),

  title: null,
  body: null,

  isFullscreen: false,

  actions: {
    save() {
      this.get('store').createRecord('post', {
        title: this.get('title'),
        body: this.get('body'),
      }).save().catch(e => {
        console.log(e.errors);
      });
    },

    fullscreen() {
      this.toggleProperty('isFullscreen');
    }
  }

});
