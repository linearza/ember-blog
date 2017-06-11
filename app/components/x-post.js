import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Component.extend({

  classNameBindings: [':x-post', 'post.isDeleting'],

  session: inject.service(),
  store: inject.service(),
  ui: inject.service(),

  post: null,

  actions: {
    delete(post) {
      post.set('isDeleting', true);
      this.get('store').findRecord('post', post.id).then((item) => {
        item.deleteRecord();
        item.save();
      });
    },

    edit(post) {
      this.get('ui').setProperties({
        writeable: post,
        isWriting: true,
      });

      // this.set('ui.writeable', post);
      // this.set('ui.isWriting', true);
    }
  }

});
