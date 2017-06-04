import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    createPost() {
      this.get('store').createRecord('post', {
        title: 'New post',
        body: 'No body'
      })
    }
  }

});
