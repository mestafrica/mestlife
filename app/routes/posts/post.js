import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    s: {
      refreshModel: true
    }
  },

  model({s, postId}) {
    return this.store.findRecord('timeline-item', postId, {include: s});
  }
});
