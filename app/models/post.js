import DS from 'ember-data';
import computed from 'ember-computed-decorators';

export default DS.Model.extend({

  title: DS.attr(),
  body: DS.attr(),

  @computed('body')
  formattedBody(body) {
    if (!body) {
      return;
    }
    return body.split("\n").join("<br />");

    // return body.replace(/(\n)+/g, '<br />');
    // body.replace(/(?:\r\n|\r|\n)/g, '<br />');
  },


  // createdAt: DS.attr(),
  // updatedAt: DS.attr(),

  // tags: DS.attr(), hasMany?

  author: DS.belongsTo('user'),

  createdAt: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  }),

  updatedAt: DS.attr('date')

});
