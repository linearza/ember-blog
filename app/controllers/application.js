import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    deletePost(post) {
      post.set('isDeleting', true);
      this.get('store').findRecord('post', post.id).then((item) => {
        item.deleteRecord();
        item.save();
      });
    }
  }

});
