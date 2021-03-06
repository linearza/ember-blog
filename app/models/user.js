import DS from 'ember-data';

export default DS.Model.extend({

  email: DS.attr(),
  // posts: DS.hasMany('post')

  createdAt: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  })

});
