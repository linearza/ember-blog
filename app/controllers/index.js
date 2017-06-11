import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    goToPost(post) {
      this.transitionToRoute('post', post.id);
    }
  }

});
