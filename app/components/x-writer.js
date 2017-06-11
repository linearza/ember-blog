import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Component.extend({

  classNameBindings: [':x-writer', 'isFullscreen'],

  store: inject.service(),
  ui: inject.service(),

  isFullscreen: true,
  goTo: null, // closure

  writeable: null,

  didInsertElement() {
    this._super(...arguments);

    if (!this.get('writeable')) {
      this.setProperties({
        writeable: this.get('store').createRecord('post')
      });
    }
  },


  actions: {
    save() {
      this.get('writeable').save().then((post) => {
        this.get('goTo')('post', post);
        this.get('ui').setProperties({
          isWriting: false,
          writeable: null
        });
      }).catch(e => {
        console.log(e.errors);
      });
    },

    close() {
      this.get('ui').setProperties({
        isWriting: false,
        writeable: null
      });
    },

    fullscreen() {
      this.toggleProperty('isFullscreen');
    }
  }

});
