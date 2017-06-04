import Ember from 'ember';

export default Ember.Controller.extend({


  newPostTitle: null,
  newPostBody: null,

  actions: {
    createPost() {
      this.get('store').createRecord('post', {
        title: 'New post',
        body: 'No body'
      }).save().catch(e => {
        console.log(e.errors);
      });
    },

    savePost() {
      this.get('store').createRecord('post', {
        title: this.get('newPostTitle'),
        body: this.get('newPostBody'),
      }).save().catch(e => {
        console.log(e.errors);
      });
    },

    deletePost(post) {
      post.set('isDeleting', true);
      this.get('store').findRecord('post', post.id).then((item) => {
        item.deleteRecord();
        item.save();
      });
    }
  }

});
