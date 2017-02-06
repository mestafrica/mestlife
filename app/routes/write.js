import Ember from 'ember';

export default Ember.Route.extend({
  resetController(controller, isExiting, transition) {
    return this._super(...arguments);
  },

  actions: {
    willTransition(transition) {
      return this._super(...arguments);
    }
  }
});
