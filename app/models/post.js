import DS from 'ember-data';

export default DS.Model.extend({

  title: DS.attr(),
  body: DS.attr(),

  // createdAt: DS.attr(),
  // updatedAt: DS.attr(),

  // tags: DS.attr(), hasMany?

  author: DS.belongsTo('user'),

});
