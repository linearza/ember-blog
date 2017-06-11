import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Controller.extend({

  ui: inject.service(),
  store: inject.service(),

  actions: {
    delete(post) {
      post.set('isDeleting', true);
      this.get('store').findRecord('post', post.id).then((item) => {
        item.deleteRecord();
        item.save();
      }).finally(() => {
        this.transitionToRoute('index');
      });
    },

    edit(post) {
      this.get('ui').setProperties({
        writeable: post,
        isWriting: true,
      });
    }
  }
});
